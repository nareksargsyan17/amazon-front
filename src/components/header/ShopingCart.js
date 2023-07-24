import {ShoppingCartOutlined} from "@ant-design/icons";
import {Space} from "antd";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import counter from "../../counter/counter";

export function ShopingCart() {
  const {
    cartCount
  } = useSelector(state => state.products);
  const navigate = useNavigate();

  const onToCart = () => {
    navigate("/cart")
  }


  return (
    <Space direction="horizontal" style={{ height : "100%"}}>
      <ShoppingCartOutlined style={{color: "white", fontSize: "35px", cursor: "pointer"}} onClick={onToCart}/>
      <span style={{color: "white"}}>{cartCount === 0 || !cartCount ? counter() : cartCount}</span>
    </Space>
  )
}