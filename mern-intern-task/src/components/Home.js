import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "../app/slices/productSlice";
import { setCategories, selectCategory } from "../app/slices/categorySlice";
import Navbar from "./Navbar";
import ProductList from "./ProductList";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedCategory = useSelector((state) => state.categories.selected);
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, selectedCategory]);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      let url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
      if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=10&skip=${(page - 1) * 10}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setProducts(data.products));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      dispatch(setCategories(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm) {
      dispatch(setLoading(true));
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleReset = () => {
    setSearchTerm(""); // Clear search state
    fetchProducts(); // Fetch all products again
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };
  
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f5dc]">
      <div className="container mx-auto p-4 flex-grow">
        <Navbar setSearchTerm={setSearchTerm} onSearch={handleSearch} onReset={handleReset} />
        <ProductList searchTerm={searchTerm} products={filteredProducts} />
      </div>
      {filteredProducts.length > 0 && (
        <footer className="bg-gray-800 w-full py-4 text-white">
          <div className="container mx-auto flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300"
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Home;
