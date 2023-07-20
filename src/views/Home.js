import {HeaderBar} from "../components/header/HeaderBar";
import {Layout, Space, theme, Typography} from "antd";
import SortBar from "../components/aside/SortBar";
import ColorsPicker from "../components/aside/ColorsPicker";
import SizesPicker from "../components/aside/SizesPicker";
import {Products} from "../components/products/Products";
import PaginationBar from "../components/products/PaginationBar";
import React from "react";
import {Footer} from "antd/es/layout/layout";

const { Title } = Typography;

const {Content, Sider} = Layout;

export  default function Home() {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  return <>
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
              padding: "20px",
            }}
            width={300}
          >
            <Space direction="vertical" style={{columnGap: "60px"}}>
              <SortBar />
              <ColorsPicker />
              <SizesPicker/>
            </Space>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <Title>Products</Title>
            <Products />
            <PaginationBar />
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

  </>
}