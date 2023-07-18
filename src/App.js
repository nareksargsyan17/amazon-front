import React from 'react';
import {Layout, theme, Typography} from 'antd';
import {HeaderBar} from "./components/header/HeaderBar";
import {Products} from "./components/products/Products";
const { Title } = Typography;

const {Content, Footer, Sider} = Layout;


const App = () => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  return (
    <Layout>
      <HeaderBar/>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            height: "100vh",
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
              padding: "20px"
            }}
            width={300}
          >
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <Title>Products</Title>
            <Products />
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;