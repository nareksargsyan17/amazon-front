import { Button, Result, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";

export default function SuccessPurchase() {
  const navigate = useNavigate();

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
        <Button type="primary" onClick={() => navigate("/orders")}>
          Order
        </Button>
      ]}
    />
  </Skeleton>
}