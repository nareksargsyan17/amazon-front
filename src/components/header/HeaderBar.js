import { Header } from "antd/es/layout/layout";
import { DrawerCategory } from "./DrawerCategory";
import { Space } from "antd";
import { SearchBar } from "./SearchBar";
import { RegistrationBar } from "./RegistrationBar";
import { ShopingCart } from "./ShopingCart";
import LogoImg from "./LogoImg";
import Dropdown from "antd/es/dropdown/dropdown";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserRequest} from "../../redux/auth/actions";

const userItems = [
  {
    key: '1',
    label: (
      <a  href="/mystore">
        My Store
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a  href="/change">
        Change Password
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a  href="/addresses">
        Addresses
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a  href="/orders">
        Orders
      </a>
    ),
  },
];

const adminItems = [
  {
    key: '1',
    label: (
      <a  href="/admin">
        Admin panel
      </a>
    ),
  },
];

export function HeaderBar() {
  const { role, isGetUserSuccess } = useSelector(state => state.auth)
  const [userRole, setRole] = useState(role);
  const [items, setItems] = useState(userItems)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserRequest())
  }, [dispatch, role])


  useEffect(() => {
    if (isGetUserSuccess) {
      setRole(role);
      if (role) {
        setItems(adminItems)
      }
    }
  }, [isGetUserSuccess, role])

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
        {!userRole ?  <ShopingCart/> : null}
        {localStorage.getItem("token") ? (
            <Dropdown
              menu={{items}}
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