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
const { Footer } = Layout;

const App = () => {

  return (
    <BrowserRouter basename="/">
      <Layout style={{minHeight: "100vh"}}>
        <Routes>
          <Route path="/">
            <Route index element={<><HeaderBar/><Home/></>}/>
            <Route path=":productId" element={<><HeaderBar/><Product/></>}/>
          </Route>
          <Route path="/signup" element={<Registration/>}/>
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