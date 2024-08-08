import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class Modal extends Component {
  render() {
    const { isOpen, onClose, content } = this.props;
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-custom-bg text-white p-6 rounded-lg max-w-md w-full">
          <div className="mb-4">{content}</div>
          <button
            onClick={onClose}
            className="bg-white text-black px-4 py-2 rounded-md font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Click the button to load data!",
      selectedNavItem: "All",
      isModalOpen: false,
      modalContent: null,
    };
  }

  handleNavItemClick = (item) => {
    this.setState({ selectedNavItem: item });
  };

  fetchData = () => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        console.log(response.data.message); // Just the message
        this.setState({
          message: response.data.message,
        });
      });
  };

  handleJokeClick = () => {
    axios
      .post("/api/jokes")
      .then((response) => {
        this.setState({
          isModalOpen: true,
          modalContent: <p className="text-lg">{response.data.joke}</p>,
        });
      })
      .catch((error) => {
        console.error("Error fetching joke:", error);
      });
  };

  handleProductClick = (product) => {
    this.setState({
      isModalOpen: true,
      modalContent: (
        <div>
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <p className="mb-2">By {product.author}</p>
          <p className="mb-2">Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
        </div>
      ),
    });
  };

  handleCategoryClick = (category) => {
    this.setState({
      isModalOpen: true,
      modalContent: (
        <div>
          <h2 className="text-xl font-bold mb-2">{category.title}</h2>
          <p className="mb-2">{category.description}</p>
          <p className="mb-1">{category.creators} creators</p>
          <p className="mb-1">{category.products} products</p>
          <p>{category.sales} sales</p>
        </div>
      ),
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalContent: null });
  };

  render() {
    return (
      <div className="bg-custom-bg text-white min-h-screen">
        <header className="bg-custom-bg p-4 border-b border-gray-800">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gumroad</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  className="bg-black px-4 py-2 rounded-full w-64 pl-10"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                className="bg-white text-black px-4 py-2 rounded-md font-semibold"
                onClick={this.handleJokeClick}
              >
                Tell me a Joke
              </button>
            </div>
          </div>
        </header>

        <nav className="bg-custom-bg p-4">
          <div className="container mx-auto flex space-x-6">
            {[
              "All",
              "Design",
              "Drawing & Painting",
              "3D",
              "Self Improvement",
              "Films",
              "Music & Sound Design",
              "Business & Money",
              "Software Development",
              "More",
            ].map((item) => (
              <button
                key={item}
                className={`hover:text-gray-300 text-sm px-3 py-1 rounded-full ${
                  this.state.selectedNavItem === item
                    ? "border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : ""
                }`}
                onClick={() => this.handleNavItemClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <main className="container mx-auto mt-8 px-4">
          <h2 className="text-2xl font-bold mb-4">Staff picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Wonderful Worlds of Nak",
                author: "Zilloo Entertainment",
                price: "CAD$3",
                rating: "5.0 (1)",
                image: "https://picsum.photos/300/200?random=1",
              },
              {
                title: "Graphic Guide to Residential Design (PDF Ebook)",
                author: "Luis Furushio",
                price: "$37",
                rating: "5.0 (20k)",
                image: "https://picsum.photos/300/200?random=2",
              },
              {
                title: "dGroom Deformer - Houdini",
                author: "birdperson",
                price: "$60+",
                rating: "5.0 (1)",
                image: "https://picsum.photos/300/200?random=3",
              },
              {
                title: "Quaint Time-Waste",
                author: "Brandon Toh",
                price: "$28",
                rating: "No ratings",
                image: "https://picsum.photos/300/200?random=4",
              },
              {
                title: "Balcony Gardening 101",
                author: "tiracado",
                price: "$5",
                rating: "5.0 (3)",
                image: "https://picsum.photos/300/200?random=5",
              },
            ].map((product) => (
              <div
                key={product.title}
                className="bg-black rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] flex flex-col h-full"
                onClick={() => this.handleProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-sm">{product.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{product.author}</p>
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <span className="text-pink-500 font-bold text-sm">
                      {product.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Products by category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "3D",
                description:
                  "Perfect your craft with the same tools used at Dreamworks and Pixar.",
                creators: "16K",
                products: "92K",
                sales: "61M",
                color: "bg-yellow-400",
              },
              {
                title: "Design",
                description:
                  "Code, design, and ship your dream product with these technical resources.",
                creators: "24K",
                products: "87K",
                sales: "30M",
                color: "bg-blue-500",
              },
            ].map((category) => (
              <div
                key={category.title}
                className="bg-black rounded-lg p-6 flex items-center space-x-4 transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                onClick={() => this.handleCategoryClick(category)}
              >
                <div
                  className={`w-16 h-16 ${category.color} rounded-full flex-shrink-0 flex items-center justify-center`}
                >
                  <span className="text-black text-2xl font-bold">
                    {category.title[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {category.description}
                  </p>
                  <div className="flex space-x-4 text-xs text-gray-400">
                    <span>{category.creators} creators</span>
                    <span>{category.products} products</span>
                    <span>{category.sales} sales</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Modal
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          content={this.state.modalContent}
        />
      </div>
    );
  }
}

export default App;
