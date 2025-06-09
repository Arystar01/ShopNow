// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import { useState } from 'react';
// import { assets } from '../assets/assets';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relavent');

//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory(category.filter(item => item !== e.target.value));
//     }
//     else {
//       setCategory([...category, e.target.value]);
//     }
//   }

//   const toggleSubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory(subCategory.filter(item => item !== e.target.value));
//     }
//     else {
//       setSubCategory([...subCategory, e.target.value]);
//     }
//   }

//   const applyFilter = () => {
//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
//     }
//     if (category.length > 0) {
//       productsCopy = productsCopy.filter(item => category.includes(item.category));
//     }
//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
//     }
//     setFilterProducts(productsCopy);
//     setShowFilter(true);


//   }
//   const sortProducts = () => {
//     let productsCopy = filterProducts.slice();
//     if (sortType === 'relavent') {
//       productsCopy = productsCopy.sort((a, b) => a.price - b.price);
//     }
//     else if (sortType === 'price-low-to-high') {
//       productsCopy = productsCopy.sort((a, b) => a.price - b.price);
//     }
//     else if (sortType === 'price-high-to-low') {
//       productsCopy = productsCopy.sort((a, b) => b.price - a.price);
//     }
//     setFilterProducts(productsCopy);
//   }

//   useEffect(() => {
//     applyFilter();

//   }, [products, search, showSearch, category, subCategory]);
//   useEffect(() => {
//     sortProducts();
//   }, [sortType, filterProducts]);

//   return (
//     <div className='flex flex-col  sm:flex-row gap-1 sm:gap-10 pt-10 border-t-2 border-gray-300'>
//       {/* filter options  */}
//       <div className='flex flex-col gap-2 sm:gap-4'>


//         <div className='min-w-60 flex items-center gap-2'>
//           <p onClick={() => { setShowFilter(!showFilter) }}
//             className='text-gray-700  flex items-center font-semibold text-lg cursor-pointer'>Filter</p>
//           <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
//         </div>
//         {/* {category filter} */}
//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
//           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700  '>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> kids
//             </p>
//           </div>
//         </div>
//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
//           <p className='mb-3 text-sm font-medium'>TYPE</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
//             </p>
//           </div>
//         </div>

//       </div>
//        <div className='flex-1'>

//         <div className='flex justify-between text-base sm:text-2xl mb-4'>
//            <h1>ALL COLLECTIONS</h1>
//             {/* Porduct Sort */}
//             <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
//               <option value="relavent">Sort by: Relavent</option>
//               <option value="low-high">Sort by: Low to High</option>
//               <option value="high-low">Sort by: High to Low</option>
//             </select>
//         </div>

//         {/* Map Products */}
//         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
//           {
//             filterProducts.map((item,index)=>(
//               <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Collection
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // Sorting
    if (sortType === 'relavent' || sortType === 'price-low-to-high') {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high-to-low') {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
    setShowFilter(true);
  }, [products, search, showSearch, category, subCategory, sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-2 border-gray-300'>
      {/* filter options  */}
      <div className='flex flex-col gap-2 sm:gap-4'>
        <div className='min-w-60 flex items-center gap-2'>
          <p onClick={() => setShowFilter(!showFilter)}
             className='text-gray-700 flex items-center font-semibold text-lg cursor-pointer'>
            Filter
          </p>
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </div>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Men', 'Women', 'Kids'].map(label => (
              <label key={label} className='flex gap-2'>
                <input className='w-3' type="checkbox" value={label} onChange={toggleCategory} /> {label}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(label => (
              <label key={label} className='flex gap-2'>
                <input className='w-3' type="checkbox" value={label} onChange={toggleSubCategory} /> {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <h1>ALL COLLECTIONS</h1>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="price-low-to-high">Sort by: Low to High</option>
            <option value="price-high-to-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
