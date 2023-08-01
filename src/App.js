import React from 'react';
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./views/Home";
import Registration from "./views/Registration";
import {Layout} from "antd";
import Product from "./views/Product";
import {HeaderBar} from "./components/header/HeaderBar";
import Back from "./components/header/Back";
import Cart from "./views/Cart";
import SignIn from "./views/SignIn";
import Verify from "./views/Verify";
import ToHome from "./components/header/ToHome";
import AuthCart from "./views/AuthCart";
import ChangePassword from "./views/ChangePassword";
import Addresses from "./views/Addresses";
import MyStore from "./views/MyStore";
import ProductAdd from "./views/ProductAdd";
import ProductEdit from "./views/ProductEdit";
const { Footer } = Layout;

const App = () => {

  return (
    <BrowserRouter basename="/">
      <Layout style={{minHeight: "100vh"}}>
        <Routes>
          <Route path="/">
            <Route index element={<><HeaderBar/><Home/></>}/>
            <Route path=":productId" element={<><HeaderBar/><Back/><Product/></>}/>
          </Route>
          <Route path="/signup" element={<><ToHome/><Registration/></>}/>
          <Route path="/signin" element={<><ToHome/><SignIn/></>}/>
          <Route path="/change" element={<><ToHome/><ChangePassword/></>}/>
          <Route path="/mycart" element={<><HeaderBar/><Back/><AuthCart/></>}/>
          <Route path="/addresses" element={<><HeaderBar/><Back/><Addresses/></>}/>
          <Route path="/mystore" element={<><HeaderBar/><Back/><MyStore/></>}/>
          <Route path="/mystore/add" element={<><HeaderBar/><Back/><ProductAdd/></>}/>
          <Route path="/mystore/edit/:productId" element={<><HeaderBar/><Back/><ProductEdit/></>}/>
          <Route path="/cart" element={<><HeaderBar/><Back/><Cart/></>}/>
          <Route path="/verify/:userId/:token" element={<Verify/>} />
        </Routes>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </BrowserRouter>
  )
};
export default App;