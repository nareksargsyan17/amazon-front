import { Header } from "antd/es/layout/layout";
import { DrawerCategory } from "./DrawerCategory";
import { Space } from "antd";
import { SearchBar } from "./SearchBar";
import { RegistrationBar } from "./RegistrationBar";
import { ShopingCart } from "./ShopingCart";
import LogoImg from "./LogoImg";
import Dropdown from "antd/es/dropdown/dropdown";
import {UserOutlined} from "@ant-design/icons";

const items = [
  {
    key: '1',
    label: (
      <a  href="/change">
        change password
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a  href="/addresses">
        addresses
      </a>
    ),
  },
];
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
        {
          localStorage.getItem("token") ? (
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow
            >
              <UserOutlined style={{color: "white", fontSize: "25px", cursor: "pointer"}} />
            </Dropdown>
          ) : null
        }
      </Space>
    </Header>
  )
}