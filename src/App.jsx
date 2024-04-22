import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Listarticles from "./components/articlesRedux/Listarticles";
import Cart from "./components/articlesRedux/Cart";
import NavScroll from "./components/NavScrolls";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./Admin/Register";
import Login from "./Admin/Login";
import Logout from "./Admin/Logout";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./Admin/ProtectedRoutes";
import Menus from "./Admin/Menu";
import ForgotPassword from "./Admin/ForgotPassword";
import ResetPassword from "./Admin/ResetPassword";
import Page404 from "./404/Page404";
import ProductsAppAdmin from "./Admin/components/articles/ProductsAppAdmin";
import CategoriesAppAdmin from "./Admin/components/categories/CategoriesAppAdmin";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      {/* {isLoggedIn? <NavScroll/> : <Login/>} */}
      <ToastContainer />

      <Router>
        <Routes>
          {/* <Route path="/menu"  element={<Menu/>}/> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Page404/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset_password/:id/:token" element={<ResetPassword />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/articlesadmin" element={<ProductsAppAdmin />} />
            <Route path="/categoriesadmin" element={<CategoriesAppAdmin />} />

          </Route>
          <Route path="/cart" element={<><NavScroll/><Cart />  </>} />
          <Route path="/" element={<Listarticles />} />
          <Route path="/articles" element={<Listarticles />} />

          

        </Routes>
      </Router>
    </>
  );
}

export default App;
