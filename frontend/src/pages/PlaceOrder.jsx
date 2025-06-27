import React, { useCallback, useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CartTotal from "../components/CartTotal";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const initPay = async (order) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "E-Shop",
      description: "Test Transaction",
      order_id: order.id,
      receipt: order.receipt,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
    };

    try {
      const { data } = await axios.post(
        backendUrl + "/api/order/verifyRazorpay",
        response,
        { headers: { token } }
      );
      if (data.success) {
        navigate("/orders");
        setCartItems({});
      }
    } catch (err) {
      console.error("Razorpay initialization failed", err);
      toast.error("Payment initialization failed. Please try again later.");
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let orderItems = [];
    // console.log(localStorage.getItem("token"));

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    let orderData = {
  userId: localStorage.getItem('userId'),
  address: {
    line: formData.address,
    city: formData.city,
    state: formData.state,
    zip: formData.zip,
    phone: formData.phone,
    name: formData.name,
    email: formData.email
  },
  method: method,
  amount: getCartAmount() + delivery_fee,
  items: orderItems,
};

    switch (method) {
      case 'cod':{
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token: localStorage.getItem('token')}})
                    // console.log(response);
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                        // console.log("error in  placing order",response.data.message);
                    }
                    break;
                }
      case "razorpay": {
        const responseRazorpay = await axios.post(
          backendUrl + "/api/order/razorpay",
          orderData,
          { headers: { token } }
        );
        if (responseRazorpay.data.success) {
          initPay(responseRazorpay.data.order);
        }

        break;
      }
      default:
        break;
    }
  };
return (
  <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-12">
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-10 border-t-2 pt-10"
    >
      {/* Delivery Info */}
      <div className="flex flex-col gap-5 w-full lg:w-1/2 bg-white p-6 shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">Delivery Information</h1>

        {[
          { name: "name", placeholder: "Full Name" },
          { name: "email", type: "email", placeholder: "Email Address" },
          { name: "phone", type: "tel", placeholder: "Phone Number" },
          { name: "address", placeholder: "Street Address" },
          { name: "city", placeholder: "City" },
          { name: "state", placeholder: "State" },
          { name: "zip", placeholder: "ZIP Code" },
        ].map(({ name, placeholder, type = "text" }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        ))}
      </div>

      {/* Payment & Cart */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white p-6 shadow-md rounded-md">
          <CartTotal />
        </div>

        <div className="mt-8 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Select Payment Method</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-3 px-4 rounded-md cursor-pointer hover:shadow-md transition ${method === "razorpay" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 px-4 rounded-md cursor-pointer hover:shadow-md transition ${method === "cod" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <span className="text-sm text-gray-700">Cash on Delivery</span>
            </div>
          </div>

          <div className="text-end mt-6">
            <button
              type="submit"
              className="bg-black text-white font-medium px-10 py-3 rounded-md hover:bg-gray-900 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
);
}

export default PlaceOrder;
