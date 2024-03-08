'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';
// import '../app/globals.css'


const HomePage = () => {
  const [products, setProducts] = useState(null); // Add type annotation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <div className='flex '>
        <div className='w-[15%]'>

        <Navbar/>
        </div>
    <div className=" mx-auto mr-12 w-[85%]">
      
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 hidden md:table-cell">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2 hidden md:table-cell">Price</th>
              {/* <th className="px-4 py-2 hidden md:table-cell">Description</th> */}
              <th className="px-4 py-2 hidden md:table-cell">Category</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2 hidden md:table-cell">Rating</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map(product => (
              <motion.tr key={product.id} whileHover={{ scale: 1.1 }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                <td className="border px-4 py-2 hidden md:table-cell">{product.id}</td>
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2 hidden md:table-cell">${product.price}</td>
                {/* <td className="border px-4 py-2 hidden md:table-cell">{product.description}</td> */}
                <td className="border px-4 py-2 hidden md:table-cell">{product.category}</td>
                <td className="border px-4 py-2"><img src={product.image} alt={product.title} className="w-24 h-auto" /></td>
                <td className="border px-4 py-2 hidden md:table-cell">{product.rating.rate} ({product.rating.count} ratings)</td>
                <td className="border px-4 py-2">
                  <Link href={`/product/${product.id}`}>
                    <div className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">View</div>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
  );
};

export default HomePage;
