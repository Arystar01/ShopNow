import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import { MdDelete } from 'react-icons/md';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const MAX_QUANTITY = 10;

  useEffect(() => {
    const newCartData = [];
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      for (const productId in cartItems) {
        const product = products.find((p) => p._id === productId);

        if (product && cartItems[productId] && typeof cartItems[productId] === 'object') {
          for (const size in cartItems[productId]) {
            const quantity = cartItems[productId][size];
            if (quantity > 0) {
              newCartData.push({
                ...product,
                size,
                quantity,
              });
            }
          }
        }
      }
    }
    setCartData(newCartData);
  }, [products, cartItems]);

  const handleIncreaseQuantity = (itemId, size, currentQuantity) => {
    if (currentQuantity < MAX_QUANTITY) {
      updateQuantity(itemId, size, currentQuantity + 1);
    }
  };

  const handleDecreaseQuantity = (itemId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, size, currentQuantity - 1);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='border-t pt-8'>
        <h1 className='text-3xl font-semibold mb-6 text-gray-800'>YOUR SHOPPING CART</h1>

        {cartData.length === 0 ? (
          <div className='text-center text-gray-500 mt-12 text-lg'>
            <p className="text-center text-gray-500 mt-12 text-lg">Your cart is currently empty. Start shopping now!</p>
            <button
              onClick={() => navigate('/')} // Use navigate for internal routing
              className='mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200'
            >
              Shop now
            </button>
          </div>
        ) : (
          <div className='space-y-6'>
            {cartData.map((item) => (
              <div
                key={`${item._id}_${item.size}`}
                className='flex flex-col sm:flex-row items-center justify-between py-6 border-b last:border-b-0 text-gray-700 gap-4'
              >
                <div className='flex items-start gap-6 flex-grow'>
                  {/* Link for product image */}
                  <Link to={`/product/${item._id}`} className="block">
                    <img
                      className='w-20 h-20 object-cover rounded-md shadow-sm hover:opacity-80 transition-opacity'
                      src={item.image?.[0] || '/placeholder.jpg'}
                      alt={item.name}
                      title="View product details"
                    />
                  </Link>
                  <div>
                    {/* Link for product name */}
                    <Link to={`/product/${item._id}`} className="text-lg sm:text-xl font-medium text-gray-900 mb-1 hover:underline">
                      {item.name}
                    </Link>
                    <div className='text-sm sm:text-base text-gray-500 space-y-0.5'>
                      <p>Category: <span className="font-light">{item.category}</span></p>
                      <p>Sub-category: <span className="font-light">{item.subCategory}</span></p>
                      {item.description && (
                        <p className="line-clamp-2">Description: <span className="font-light">{item.description}</span></p>
                      )}
                    </div>
                    <div className='flex items-center gap-4 mt-3'>
                      <p className='text-md font-semibold'>{currency}{item.price}</p>
                      <span className='px-3 py-1 bg-gray-100 border border-gray-200 rounded text-sm font-medium'>
                        Size: {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2 mt-4 sm:mt-0'>
                  <button
                    onClick={() => handleDecreaseQuantity(item._id, item.size, item.quantity)}
                    disabled={item.quantity <= 1}
                    className='p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    title="Decrease quantity"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <span className='w-10 sm:w-12 text-center py-2 border border-gray-300 rounded-md text-lg font-medium'>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(item._id, item.size, item.quantity)}
                    disabled={item.quantity >= MAX_QUANTITY}
                    className='p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    title="Increase quantity"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>

                  <MdDelete
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className='w-7 h-7 cursor-pointer text-red-600 hover:text-red-700 transition-colors duration-200 ml-4'
                    title="Remove item from cart"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='flex justify-end my-16'>
          <div className='w-full sm:w-[450px] bg-gray-50 p-6 rounded-lg shadow-md'>
            <CartTotal />
            <div className='w-full text-end mt-8'>
              <button
                onClick={() => navigate('/place-order')}
                disabled={cartData.length === 0}
                className='w-full bg-black text-white text-lg font-semibold py-4 rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;