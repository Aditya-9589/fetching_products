import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../app/slices/categorySlice";

const Navbar = ({ setSearchTerm, onSearch, onReset }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleCategoryChange = (event) => {
    dispatch(selectCategory(event.target.value)); // Dispatch the selected category
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value; // Get the input value
    setLocalSearchTerm(inputValue); // Track search input locally
    setSearchTerm(inputValue); // Update the search term in the parent state

    if (inputValue === "") {
      onReset(); // Trigger the reset action to show all products
    }
  };

  const handleSearchClick = () => {
    onSearch(); // Trigger the search action
  };

  const handleResetClick = () => {
    setLocalSearchTerm(""); // Clear local input
    setSearchTerm(""); // Clear search term in the parent state
    onReset(); // Trigger the reset action
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(); // Call the search function if Enter is pressed
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
      <div className="flex-shrink-0">
        <select
          className="border border-gray-300 rounded p-2 bg-white text-black hover:bg-gray-100"
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded text-black bg-white"
          value={localSearchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition duration-300"
          onClick={handleSearchClick}
        >
          Search
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-300"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
