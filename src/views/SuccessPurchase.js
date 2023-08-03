import {Button, Result, Skeleton} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getCartRequest} from "../redux/cart/actions";

export default function SuccessPurchase() {
  const { cartsData } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartRequest());

  }, [dispatch])
  
  useEffect(() => {
    if (cartsData) {
      console.log(cartsData)
    }
  }, [cartsData])

  return <Skeleton active loading={false} style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    width: "50%",
    margin: "40px auto"
  }}>
    <Result
      style={{height: "100vh"}}
      status="success"
      title={"Your payment is success"}
      subTitle="Please go to Orders"
      extra={[
        <Button type="primary" onClick={() => navigate("/signin")}>
          Order
        </Button>
      ]}
    />
  </Skeleton>
}