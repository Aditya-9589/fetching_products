import React from "react";

const ProductList = ({ products }) => {
  return (
    <div>
      {/* Check if there are no products matching the search term */}
      {products.length === 0 ? (
        <div className="text-center text-red-500 p-4 m-8 ">
          <h3 className="text-xl font-bold" >
            No products match your search. Please try again.
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id}  className="p-4 border rounded-lg bg-white shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2 text-gray-800">{product.title}</h2>
              <p className="mt-1 text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
