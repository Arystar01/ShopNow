import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import SearchBar from './components/SearchBar';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
 
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gray-200 ">
        {/* <ToastContainer /> */}
        <Navbar />
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path ="/admin" element={<AdminDashboard/>}/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
  
  );
};

export default App;
 