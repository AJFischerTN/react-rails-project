Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data

    get '/data', to: 'tests#index'
    
    resources :jokes, only: [:index, :create]

  end

  # get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
  #  !request.xhr? && request.format.html?
  #end

  root 'main#index'
  
  get '*path' => 'main#index'

end
