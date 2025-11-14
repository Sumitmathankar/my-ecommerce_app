import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css"; // Optional: comment if PostCSS conflicts
import wallpaper1 from "../images/wallpaper_1.jpg";
import wallpaper2 from "../images/wallpaper_2.jpg";
import wallpaper3 from "../images/wallpaper_3.jpg";

function Home() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const images = [wallpaper1, wallpaper2, wallpaper3];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5116/api/Product/ProductAll"
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Store</h1>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-md mx-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            {storedUser ? (
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-full bg-gray-200 text-blue-600 flex items-center justify-center font-bold cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {storedUser?.FullName
                    ? storedUser.FullName[0].toUpperCase()
                    : "U"}
                </div>
                <span
                  className="cursor-pointer font-semibold"
                  onClick={toggleDropdown}
                >
                  {storedUser.FullName}
                </span>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-t-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <a href="/login" className="hover:underline">
                  Login
                </a>
                <a href="/register" className="hover:underline">
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[500px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 -z-10">
          <Slider {...settings} className="h-full">
            {images.map((src, idx) => (
              <div key={idx} className="h-[500px] relative">
                <img
                  src={src}
                  alt={`slide-${idx}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="relative z-10 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to E-Store
          </h2>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Discover your next favorite product at unbeatable prices!
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>
      </header>

      {/* Products */}
      <section className="flex-grow container mx-auto py-12 px-4">
        <h3 className="text-2xl font-bold mb-6 text-center">Featured Products</h3>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.productId}
                className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center"
              >
                <img
                  src={
                    product.images && product.images.length > 0
                      ? `http://localhost:5116${product.images[0]}`
                      : "/fallback.png"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-blue-600 font-bold mb-2">${product.price}</p>
                <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          &copy; 2025 E-Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
