import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        setBestSeller(products.filter((product) => product.bestSeller === true).slice(0, 5));
    }, [products])
    return (
        <div className='my-5'>
            <div className="flex flex-col gap-1  justify-center py-8">
                <div className="text-center flex items-center justify-center  text-3xl gap-2 font-bold text-gray-700">
                    <h1 className="font-sans">Best</h1>
                    <h1 className="font-mono">SELLER</h1>
                </div>
                <p className="w-3/4 m-auto text-s sm:text-sm md-text-base text-gray-600 flex items-center justify-center">
                    Bestsellers: Loved by thousands! Shop top-rated picks everyone’s buying now. � Free shipping today!
                </p>
            </div>

            {/*  rendering products carusels */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>

        </div>
    )
}

export default BestSeller
