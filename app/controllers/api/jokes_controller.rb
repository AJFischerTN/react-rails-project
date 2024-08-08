require 'net/http'
require 'json'

module Api
  class JokesController < ApplicationController
    def create
      begin
        uri = URI('https://api.anthropic.com/v1/messages')
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true

        request = Net::HTTP::Post.new(uri)
        request['x-api-key'] = ENV['ANTHROPIC_API_KEY']
        request['anthropic-version'] = '2023-06-01'
        request['content-type'] = 'application/json'

        request.body = {
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1024,
          messages: [
            { role: 'user', content: 'Tell me a short, quippy joke.' }
          ]
        }.to_json

        Rails.logger.info "Sending request to Anthropic API"
        response = http.request(request)
        Rails.logger.info "Response status: #{response.code}"
        Rails.logger.info "Response body: #{response.body}"

        if response.is_a?(Net::HTTPSuccess)
          joke = JSON.parse(response.body)['content'][0]['text']
          render json: { joke: joke }, status: :created
        else
          render json: { error: "API request failed: #{response.message}", status: response.code, body: response.body }, status: :bad_gateway
        end
      rescue StandardError => e
        Rails.logger.error "Unexpected error: #{e.message}"
        Rails.logger.error e.backtrace.join("\n")
        render json: { error: "An unexpected error occurred: #{e.message}" }, status: :internal_server_error
      end
    end
  end
end