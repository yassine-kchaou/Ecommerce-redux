import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Listarticles from "./components/articlesRedux/Listarticles";
import Cart from "./components/articlesRedux/Cart";
import NavScroll from "./components/NavScrolls";
import ProductsAppAdmin from "./Admin/components/articles/ProductsAppAdmin";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <NavScroll/>
        <Routes>
          <Route path="/Admin" element ={<ProductsAppAdmin/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Listarticles />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
