import userModel from "../models/userModel.js";

const getUserCart = async (req, res) => {
  try {
    // Assuming userId is coming from authentication middleware (req.userId) if you're using tokens
    // If not, and you're relying on req.body for userId, you'll need to adjust your frontend calls
    const userId = req.body.userId; // Use req.userId if authenticated, otherwise req.body.userId

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    const userData = await userModel.findById(userId);

    // Ensure cartData exists, default to an empty object if null/undefined
    const cartData = userData.cartData || {}; 

    res.json({
      success: true,
      cartData: cartData,
    });
  } catch (error) {
    console.error("Error in getting cart:", error); // Use console.error for errors
    res.json({ success: false, message: "Error in getting cart" });
  }
};

const addToCart = async (req, res) => {
  try {
    // Assuming userId is coming from authentication middleware (req.userId)
    const userId = req.userId; // Use req.userId if authenticated, otherwise req.body.userId
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    // Ensure cartData exists, default to an empty object if null/undefined
    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {}; // Initialize item if it doesn't exist
    }
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error in adding to cart:", error);
    res.json({ success: false, message: "Error in adding to cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    // Assuming userId is coming from authentication middleware (req.userId)
    const userId = req.userId; // Use req.userId if authenticated, otherwise req.body.userId
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {}; // Ensure cartData exists

    // Validate if item and size exist before trying to update, especially if quantity becomes 0
    if (!cartData[itemId] || typeof cartData[itemId] !== 'object') {
        return res.status(400).json({ success: false, message: "Item not found in cart." });
    }

    if (quantity <= 0) {
      // If quantity is 0 or less, remove the specific size
      if (cartData[itemId][size]) {
        delete cartData[itemId][size];

        // If no other sizes exist for this item, remove the item entry
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
          // If trying to remove a non-existent item/size, respond gracefully
          return res.status(400).json({ success: false, message: "Item size not found in cart for removal." });
      }
    } else {
      // Otherwise, update the quantity
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated successfully." });
  } catch (error) {
    console.error("Error in updating cart:", error);
    res.json({ success: false, message: "Error in updating cart: " + error.message });
  }
};

// --- NEW FUNCTION: removeFromCart (for explicit removal if needed, but updateCart can handle 0 quantity) ---
const removeFromCart = async (req, res) => {
  try {
    // Assuming userId is coming from authentication middleware (req.userId)
    const userId = req.userId;
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {}; // Ensure cartData exists

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size]; // Remove the specific size entry

      // If no other sizes exist for this itemId, remove the entire itemId entry
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      return res.status(404).json({ success: false, message: "Item or size not found in cart." });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item removed from cart." });
  } catch (error) {
    console.error("Error in removing from cart:", error);
    res.json({ success: false, message: "Error in removing from cart: " + error.message });
  }
};

export { getUserCart, addToCart, updateCart, removeFromCart }; // Export the new function