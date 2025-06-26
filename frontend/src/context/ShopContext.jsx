import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import propsTypes from 'prop-types';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = 'http://localhost:3000';

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : {};
    });
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // --- Cart Management Functions ---

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select a product size.');
            return;
        }

        // Create a deep copy to ensure immutability
        let newCartData = structuredClone(cartItems);

        // Initialize item if it doesn't exist, then update size quantity
        if (!newCartData[itemId]) {
            newCartData[itemId] = {};
        }
        newCartData[itemId][size] = (newCartData[itemId][size] || 0) + 1;

        setCartItems(newCartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart on backend:", error);
                toast.error("Failed to add item to cart.");
            }
        }
    };

    const removeFromCart = async (itemId, size) => {
        // Create a deep copy to ensure immutability
        let newCartData = structuredClone(cartItems);

        if (newCartData[itemId] && newCartData[itemId][size]) {
            // Remove the specific size from the item
            delete newCartData[itemId][size];

            // If no other sizes exist for this item, remove the item entirely
            if (Object.keys(newCartData[itemId]).length === 0) {
                delete newCartData[itemId];
            }
        } else {
            console.warn(`Attempted to remove item ${itemId} with size ${size}, but it was not found in cart.`);
            return; // Item or size not found, nothing to do
        }

        setCartItems(newCartData);

        if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/remove', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart on backend:", error);
                toast.error("Failed to remove item from cart.");
            }
        }
    };


    const updateQuantity = async (itemId, size, quantity) => {
        let newCartData = structuredClone(cartItems);

        if (!newCartData[itemId]) {
            newCartData[itemId] = {}; // Ensure the item object exists
        }

        if (quantity <= 0) {
            // If quantity is 0 or less, remove the item/size completely
            if (newCartData[itemId] && newCartData[itemId][size]) {
                delete newCartData[itemId][size];
                if (Object.keys(newCartData[itemId]).length === 0) {
                    delete newCartData[itemId]; // Remove item if no sizes left
                }
            }
        } else {
            newCartData[itemId][size] = quantity;
        }

        setCartItems(newCartData);

        if (token) {
            try {
                if (quantity <= 0) {
                    // Call backend remove API if quantity is 0
                    await axios.post(backendUrl + '/api/cart/remove', { itemId, size }, { headers: { token } });
                } else {
                    // Otherwise, call backend update API
                    await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
                }
            } catch (error) {
                console.error("Error updating quantity on backend:", error);
                toast.error("Failed to update item quantity.");
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    totalCount += cartItems[itemId][size];
                }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) { // Ensure product info is found
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemId][size];
                    }
                }
            }
        }
        return totalAmount;
    };

    // --- API Calls ---

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products.");
        }
    };

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: userToken } });
            if (response.data.success) {
                // Backend cart structure might be different, adjust if needed
                // Assuming backend returns { productId: { size: quantity, ... }, ... }
                setCartItems(response.data.cartData || {}); // Ensure it's an object
            }
        } catch (error) {
            console.error("Error fetching user cart:", error);
            toast.error("Failed to load user cart.");
        }
    };

    // --- Effects ---

    // Initial product data fetch on component mount
    useEffect(() => {
        getProductsData();
    }, []);

    // Handle token changes and fetch user cart
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) { // Only set token if it's not already set in state
            setToken(storedToken);
        }

        // Fetch user cart whenever token changes (including initial load if token exists)
        if (token) {
            getUserCart(token);
        }
    }, [token]); // Depend on token

    // Persist cart items to local storage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // --- Context Value ---

    const contextValue = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, removeFromCart, updateQuantity, setCartItems, // Added removeFromCart
        getCartCount, getCartAmount, navigate, backendUrl,
        setToken, token
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: propsTypes.node.isRequired
};

export default ShopContextProvider;