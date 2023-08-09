import { ShoppingCartOutlined } from "@ant-design/icons";
import {Badge, Space} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCartRequest } from "../../redux/cart/actions";
import { changeCartCountRequest } from "../../redux/products/actions";
import { usePrevious } from "../../usePrevious/usePrevious";

export function ShopingCart() {
  const {
    cartCount,
  } = useSelector(state => state.products);
  const {cartsData, isGetCartSuccess,} = useSelector(state => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const prevSucces = usePrevious(isGetCartSuccess)



  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getCartRequest());
    }

  }, [dispatch])

  useEffect(() => {
    if (isGetCartSuccess && prevSucces === false) {
      const {products} = cartsData;
      let count = 0;
      products.forEach(prod => {
        count += prod.count;
      })
      dispatch(changeCartCountRequest(count))
    }
  }, [cartsData, dispatch, isGetCartSuccess, prevSucces, cartCount])


  const onToCart = () => {
    if (localStorage.getItem("token")) {
      navigate("/mycart");
    } else {
      navigate("/cart");
    }
  };


  return (
    <Space direction="horizontal" style={{height: "100%", margin: "0 8px"}}>
      <Badge count={cartCount} color={"rgb(239 165 0)"}>
        <ShoppingCartOutlined style={{color: "white", fontSize: "25px", cursor: "pointer"}} onClick={onToCart}/>
      </Badge>
    </Space>
  )
}