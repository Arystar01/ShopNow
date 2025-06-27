## 🛍️ ShopNow – E-Commerce Web App

**ShopNow** is a modern and minimalistic full-stack e-commerce web application. It allows users to browse products, add them to the cart, register/login, place orders (Cash on Delivery), and manage their orders. Admins can access an admin dashboard to manage products and orders.

---

### 🚀 Live Demo

🌐 Frontend: [https://shopnow-f.onrender.com](https://shopnow-f.onrender.com)
🌐 Backend: [https://shopnow-b.onrender.com](https://shopnow-b.onrender.com)


[🎬 Watch Demo Video](https://youtu.be/0NyBCI4FH1w )
---

## 📁 Folder Structure

```
├── client/                 # React Frontend (ShopNow UI)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/        # ShopContext (Cart/Auth logic)
│   │   └── App.jsx
│   └── public/
├── server/                 # Express Backend (API & MongoDB)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
```

---

## 🧑‍💻 Features

### 🛒 User Side

* Register / Login / Logout (token-based)
* Browse products with filtering/search
* Add to Cart with size selection
* Update quantities or remove items
* Place orders with address (COD)
* View previous orders
* Mobile Responsive UI

### 🔐 Admin Side

* Admin authentication
* Add / edit / delete products
* View all orders
* Update order status (e.g., shipped/delivered)

---

## 🔧 Tech Stack

### Frontend:

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Auth
* CORS

### Deployment:

* **Frontend**: [Render](https://render.com)
* **Backend**: [Render](https://render.com)
* **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## ⚙️ Getting Started Locally

### 1. Clone Repository

```bash
git clone https://github.com/your-username/shopnow.git
cd shopnow
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Start React app:

```bash
npm run dev
```

---

## 🌐 Environment Variables

**Backend (`server/.env`):**

```env
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**Frontend (`client/src/context/ShopContext.jsx`):**

```js
const backendUrl = "https://shopnow-b.onrender.com";
```

---

## 📦 API Routes (Backend)

### Auth

* `POST /api/user/register`
* `POST /api/user/login`

### Products

* `POST /api/product/add`
* `POST /api/product/remove`
* `GET /api/product/list`

### Cart

* `POST /api/cart/add`
* `POST /api/cart/remove`
* `POST /api/cart/update`
* `POST /api/cart/get`

### Orders

* `POST /api/order/place`
* `POST /api/order/list`
* `POST /api/order/status`

---

## 📸 Screenshots

> *(Add screenshots here showing Home, Product List, Cart, Login, Admin Dashboard, etc.)*

---

## 🙌 Author

Made with ❤️ by [Aryan Rastogi](https://github.com/arystar01)

---

## 📃 License

This project is open source and available under the [MIT License](LICENSE).

---

Let me know if you'd like a `CONTRIBUTING.md`, API docs, or UI walkthrough added as well!
