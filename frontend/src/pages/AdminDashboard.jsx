import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";


const AdminDashboard = () => {
  const {token, backendUrl}= useContext(ShopContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});
 const [newProductData, setNewProductData] = useState(
{
  "name": "Under Armour Base Layer",
  "description": "Compression fit base layer for cold-weather training.",
  "price": "45.00",
  "category": "Topwear",
  "subCategory": "Thermals",
  "sizes": "S,M,L,XL",
  "bestseller": "false",
  "quantity": "50",
  "color": "Charcoal",
  "brand": "Under Armour",
  "image": ""
}



);

  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [addAdminForm, setAddAdminForm] = useState(false);

const [newAdminData, setNewAdminData] = useState({ name: "", email: "" });

const addAdmin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${backendUrl}/api/user/addAdmin`, newAdminData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.data.success) {
      alert("Admin added successfully");
      setNewAdminData({ name: "", email: "" });
      setAddAdminForm(false);
    } else {
      alert(res.data.message || "Failed to add admin");
    }
  } catch (error) {
    console.error("Error adding admin:", error);
    alert("Something went wrong");
  }
};

useEffect(() => {
  const checkAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!backendUrl) {
        console.error("Backend URL is not set");
        return;
      }

      if (!token) {
        console.warn("No token found in localStorage");
        return;
      }

      const res = await axios.get(`${backendUrl}/api/user/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Admin check response:", res.data);

      if (res.data.success && res.data.isAdmin) {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
      } else {
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
      }

    } catch (err) {
      console.error("Admin check failed", err);
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }
  };

  checkAdmin();
}, []);

  const displayProduct = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error displaying products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        displayProduct();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        {
          id: editProductId,
          ...editProductData,
          sizes: JSON.stringify(editProductData.sizes || []),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setEditProductId(null);
        setEditProductData({});
        displayProduct();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const displayOrders = async () => {
    try {
      const response = await axios.get("/api/order/list");
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error displaying orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        "/api/order/status",
        { orderId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        displayOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
const addNewProduct = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", newProductData.name);
    formData.append("description", newProductData.description);
    formData.append("price", newProductData.price);
    formData.append("category", newProductData.category);
    formData.append("subCategory", newProductData.subCategory);
    formData.append("sizes", JSON.stringify(newProductData.sizes.split(",")));
    formData.append("bestseller", newProductData.bestseller);
    formData.append("Quantity", newProductData.quantity);
    formData.append("color", newProductData.color);
    formData.append("brand", newProductData.brand);

    // Append image files
  for (let i = 0; i < newProductData.image.length; i++) {
  formData.append("image", newProductData.image[i]); // match backend field name
}


    const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Response from server:", response.data);
    if (response.data.success) {
      setShowNewProductForm(false);
      setNewProductData({});
      displayProduct();
    }
  } catch (error) {
    console.error("Error adding new product:", error);
  }
};

  return (
    <div className="admin-dashboard p-4">
      {!isAdmin ? (
        <h1 className="text-red-600 font-bold text-xl">
          You do not have access to the Admin Dashboard
        </h1>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
          <div className="space-x-2 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={displayProduct}>
              View Products
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={displayOrders}>
              View Orders
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setShowNewProductForm(true)}>
              Add New Product
              </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setAddAdminForm(true)}> Add Admins </button>
      
          </div>

          {showNewProductForm && (
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-2">Add New Product</h2>
              <form onSubmit={addNewProduct} className="space-y-2">
                <input type="text" placeholder="Name" className="border p-2 w-full" value={newProductData.name} onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })} />
                <input type="text" placeholder="Description" className="border p-2 w-full" value={newProductData.description} onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })} />
                <input type="number" placeholder="Price" className="border p-2 w-full" value={newProductData.price} onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })} />
                <input type="text" placeholder="Category" className="border p-2 w-full" value={newProductData.category} onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })} />
                <input type="text" placeholder="Subcategory" className="border p-2 w-full" value={newProductData.subCategory} onChange={(e) => setNewProductData({ ...newProductData, subCategory: e.target.value })} />
                <input type="text" placeholder="Sizes (comma separated)" className="border p-2 w-full" value={newProductData.sizes} onChange={(e) => setNewProductData({ ...newProductData, sizes: e.target.value })} />
                {/* <input type="file" multiple onChange={(e) => setNewProductData({...newProductData, image: Array.from(e.target.files)})} />
                 
                 */}
                 <input type="file" multiple onChange={(e) => setNewProductData({...newProductData, image: Array.from(e.target.files)})} />

                <input type="number" placeholder="Quantity" className="border p-2 w-full" value={newProductData.quantity} onChange={(e) => setNewProductData({ ...newProductData, Quantity: e.target.value })} />
                <input type="text" placeholder="Color" className="border p-2 w-full" value={newProductData.color} onChange={(e) => setNewProductData({ ...newProductData, color: e.target.value })} />
                <input type="text" placeholder="Brand" className="border p-2 w-full" value={newProductData.brand} onChange={(e) => setNewProductData({ ...newProductData, brand: e.target.value })} />
                <input type="text" placeholder="Bestseller" className="border p-2 w-full" value={newProductData.bestseller} onChange={(e) => setNewProductData({ ...newProductData, bestseller: e.target.value })} />
                
                <select className="border p-2 w-full" value={newProductData.bestseller} onChange={(e) => setNewProductData({ ...newProductData, bestseller: e.target.value === "true" })}>
                  <option value="false">Not Bestseller</option>
                  <option value="true">Bestseller</option>
                </select>
                <div className="flex gap-2">
                  <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Submit</button>
                  <button type="button" className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setShowNewProductForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
          {
            addAdminForm && (
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">Add New Admin</h2>
                <form onSubmit={addAdmin} className="space-y-2">
                  <input type="text" placeholder="Name" className="border p-2 w-full" value={newAdminData.name} onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })} />
                  <input type="email" placeholder="Email" className="border p-2 w-full" value={newAdminData.email} onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })} />
                  {/* <input type="password" placeholder="Password" className="border p-2 w-full" value={newAdminData.password} onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })} /> */}
                  <div className="flex gap-2">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setAddAdminForm(true)}> Add Admins </button>

                    <button type="button" className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setAddAdminForm(false)}>Cancel</button> 
                  </div>
                </form>
              </div>
            )
          }

          {/* Products Display and Edit */}
          <h2 className="text-xl font-semibold mt-6 mb-2">Products</h2>
          {products.map((product) => (
            <div key={product._id} className="border p-4 mb-4 rounded shadow">
              {editProductId === product._id ? (
                <div className="space-y-2">
                  <input type="text" className="border p-1 w-full" value={editProductData.name || ""} onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })} />
                  <input type="number" className="border p-1 w-full" value={editProductData.price || ""} onChange={(e) => setEditProductData({ ...editProductData, price: e.target.value })} />
                  <input type="text" className="border p-1 w-full" value={editProductData.category || ""} onChange={(e) => setEditProductData({ ...editProductData, category: e.target.value })} />
                  <input type="text" className="border p-1 w-full" value={editProductData.subCategory || ""} onChange={(e) => setEditProductData({ ...editProductData, subCategory: e.target.value })} />
                  <input type="text" className="border p-1 w-full" value={editProductData.sizes || ""} onChange={(e) => setEditProductData({ ...editProductData, sizes: e.target.value.split(",") })} />
                  <textarea className="border p-1 w-full" value={editProductData.description || ""} onChange={(e) => setEditProductData({ ...editProductData, description: e.target.value })}></textarea>
                  <select className="border p-1 w-full" value={editProductData.bestseller || false} onChange={(e) => setEditProductData({ ...editProductData, bestseller: e.target.value === "true" })}>
                    <option value={false}>Not Bestseller</option>
                    <option value={true}>Bestseller</option>
                  </select>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={updateProduct}>Save</button>
                  <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setEditProductId(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3 className="font-bold">{product.name}</h3>
                  <p>₹ {product.price}</p>
                  <p>{product.description}</p>
                  <img src={product.image[0]} alt={product.name} className="w-32 h-32 object-cover mt-2" />
                  <div className="space-x-2 mt-2">
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteProduct(product._id)}>Remove</button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => {
                      setEditProductId(product._id);
                      setEditProductData({
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        subCategory: product.subCategory,
                        sizes: product.sizes.join(","),
                        bestseller: product.bestseller,
                      });
                    }}>Edit</button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Orders Display */}
          <h2 className="text-xl font-semibold mt-6 mb-2">Orders</h2>
          {orders.map((order) => (
            <div key={order._id} className="border p-4 mb-4 rounded shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>User:</strong> {order.user?.name}</p>
              <div className="space-x-2 mt-2">
                <select className="border p-1" value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
