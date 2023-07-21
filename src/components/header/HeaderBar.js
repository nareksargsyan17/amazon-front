import {Header} from "antd/es/layout/layout";
import {DrawerCategory} from "./DrawerCategory";
import {Image, Space} from "antd";
import { SearchBar } from "./SearchBar";
import {RegistrationBar} from "./RegistrationBar";
import {ShopingCart} from "./ShopingCart";
import {useNavigate} from "react-router-dom";

export function HeaderBar() {
  const navigate = useNavigate()
  const onRouteHome = () => {
    navigate("/")
  }
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
            <Image src="logo.png" preview={false} width={50} style={{ cursor: "pointer" }} onClick={onRouteHome}/>
          </Space>
          <SearchBar />
          <Space align="center">
            <RegistrationBar/>
            <ShopingCart/>
          </Space>
        </Header>
    )
}