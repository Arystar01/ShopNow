  import { useState, useContext, useEffect } from 'react';
  import { ShopContext } from '../context/ShopContext';
  import CartTotal from '../components/CartTotal';
  import { MdDelete } from 'react-icons/md';

  const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
      if (products.length > 0 && Object.keys(cartItems).length > 0) {
        const cart = Object.entries(cartItems).map(([key, quantity]) => {
          const [productId, size] = key.split("_");
          const product = products.find((product) => product._id === productId);
          if (product) {
            return {
              ...product,
              size,
              quantity,
            };
          }
          return null;
        }).filter(item => item !== null);
        setCartData(cart);
      } else {
        setCartData([]);
      }
    }, [products, cartItems]);

    return (
      <div>
        <div className='border-t pt-14'>
          <div className='text-2xl mb-3'>
            <h1>YOUR SHOP CART</h1>
          </div>

          <div>
            {cartData.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
            ) : (
              cartData.map((item, index) => (
                <div
                  key={`${item._id}_${item.size}_${index}`}
                  className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                >
                  <div className='flex items-start gap-6'>
                    <img
                      className='w-16 sm:w-20'
                      src={item.image?.[0] || '/placeholder.jpg'}
                      alt={item.name}
                    />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                      <div className='text-xs sm:text-sm text-gray-500'>
                        <p>Category: {item.category}</p>
                        <p>Sub-category: {item.subCategory}</p>
                        <p className="line-clamp-2">Description: {item.description}</p>
                      </div>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{item.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  <MdDelete
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className='w-5 h-5 cursor-pointer text-red-500'
                  />
                </div>
              ))
            )}
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button
                  onClick={() => navigate('/place-order')}
                  className='bg-black text-white text-sm my-8 px-8 py-3'
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
