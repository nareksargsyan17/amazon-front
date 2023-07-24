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
          <Route path="/signup" element={<><Back/><Registration/></>}/>
          <Route path="/signin" element={<><Back/><SignIn/></>}/>
          <Route path="/cart" element={<><HeaderBar/><Back/><Cart/></>}/>
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