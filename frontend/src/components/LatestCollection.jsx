import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import  { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
const LatestCollection = () => {
    const { products } = useContext(ShopContext);
     const [latestProducts,setLatestProducts] = useState([]);
     useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
    return (
        <div className="my-10">
            <div className="flex flex-col gap-1  justify-center py-8">
                <div className="text-center flex items-center justify-center  text-3xl gap-2 font-bold text-gray-700">
                    <h1 className="font-sans">LATEST</h1>
                    <h1 className="font-mono">COLLECTION</h1>
                </div>
                <p className="w-3/4 m-auto text-s sm:text-sm md-text-base text-gray-600 flex items-center justify-center">New styles just landed! Shop the freshest trends now. Limited stock—don’t miss out! ✨ #NewArrivals
                </p>
            </div>
            {/*  rendering products carsousels */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>

        </div>
    );
};

export default LatestCollection;
