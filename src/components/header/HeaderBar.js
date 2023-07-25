import { Header } from "antd/es/layout/layout";
import { DrawerCategory } from "./DrawerCategory";
import { Space } from "antd";
import { SearchBar } from "./SearchBar";
import { RegistrationBar } from "./RegistrationBar";
import { ShopingCart } from "./ShopingCart";
import LogoImg from "./LogoImg";

export function HeaderBar() {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
      }}
    >
      <Space wrap>
        <DrawerCategory/>
        <LogoImg/>
      </Space>
      <SearchBar/>
      <Space align="center" style={{height: "100%", position: "relative"}}>
        <RegistrationBar/>
        <ShopingCart/>
      </Space>
    </Header>
  )
}