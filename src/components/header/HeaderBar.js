import {Header} from "antd/es/layout/layout";
import {DrawerCategory} from "./DrawerCategory";
import {Image, Space} from "antd";
import { SearchBar } from "./SearchBar";
import {RegistrationBar} from "./RegistrationBar";
import {ShopingCart} from "./ShopingCart";

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
            <DrawerCategory />
            <Image src="logo.png" preview={false} width={50} style={{ cursor: "pointer" }}/>
          </Space>
          <SearchBar />
          <Space align="center">
            <RegistrationBar/>
            <ShopingCart/>
          </Space>
        </Header>
    )
}