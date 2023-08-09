import {Empty, Image, Layout, Skeleton, Space, Spin, Typography} from "antd";
import Card from "antd/es/card/Card";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getOrdersRequest} from "../redux/orders/actions";
import {LoadingOutlined} from "@ant-design/icons";
import {getUserRequest} from "../redux/auth/actions";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Orders() {
  const {orders, isGetOrdersSuccess} = useSelector(state => state.orders)
  const { role, isGetUserSuccess, isGetUserFailure, isGetUserRequest } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totalAmount = 0;
  let totalCount = 0;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserRequest());
    } else {
      navigate("/notfound");
    }
  }, [dispatch, navigate])


  useEffect(() => {
    if (isGetUserSuccess) {
      if (role) {
        navigate("/notfound");
      }
    }

    if (isGetUserFailure) {
      navigate("/notfound");
    }
  }, [isGetUserFailure, isGetUserSuccess, navigate, role])



  useEffect(() => {
    dispatch(getOrdersRequest())
  }, [dispatch]);

  orders.forEach((order) => {
    totalCount += order.count;
    totalAmount += (order.count * order.products.price)
  })


  return <Skeleton active loading={isGetUserRequest}>
    <Content style={{margin: "0 50px", padding: "20px", backgroundColor: "white"}}>
      <Space direction="horizontal" style={{display: "flex", justifyContent: "space-around", margin: "30px 30px"}}>
        <Space style={{width: "100%"}}><Title style={{textAlign: "center", width: "100%"}}>Orders</Title></Space>
        <Space direction="vertical">
          {
            isGetOrdersSuccess ? (
              <>
                <Title level={3}>Total Count:  {totalCount}</Title>
                <Title level={3}>Total Amount:  ${totalAmount}</Title>
              </>
            ) : (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)
          }

        </Space>
      </Space>
      <Space wrap style={{width: "100%", display: "flex", justifyContent: "center"}}>
        {
          isGetOrdersSuccess ? (
            orders.length > 0 ? (
              orders.map(order => (
                <Card key={order.id} style={{border: "0.5px solid grey", textAlign: "center"}} className="cart">
                  <Space>
                    <Image
                      width={180}
                      src={"http://localhost:3001/" + order.products.images[0].path}
                    />
                  </Space>
                  <Space direction="vertical" style={{columnGap: 0, textAlign: "left"}}>
                    <Title level={4} onClick={() => navigate("/" + 2)}
                           style={{cursor: "pointer"}}>Product: {order.products.name}</Title>
                    <Text><b>Brand: </b>{order.products.brand}</Text>
                    <Title level={5}>Price: ${order.products.price}</Title>
                    <Text><b>Size: </b>{order.size}</Text>
                    <Text><b>Color: </b>{order.color}</Text>
                    <Text><b>Count: </b>{order.count}</Text>
                    <Text><b>Amount: </b>${order.count * order.products.price}</Text>
                    <Text><b>Order Date: </b>{new Date(order.createdAt).toLocaleString()}</Text>
                  </Space>
                </Card>
              ))
            ) : (
              <Empty/>
            )
          ): (
            <Spin style={{width: "100%", textAlign: "center"}} indicator={<LoadingOutlined style={{ fontSize: 24, margin: "auto auto", width: "100%" }} spin />} />
          )
        }

      </Space>
    </Content>
  </Skeleton>
}