import {Button, Card, Empty, Image, Layout, Popconfirm, Select, Skeleton, Space, Typography} from "antd";
import "../App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {deleteCartRequest, getCartRequest, updateCartRequest} from "../redux/cart/actions";
import {usePrevious} from "../usePrevious/usePrevious";

const { Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card

export default function AuthCart() {
  const dispatch = useDispatch();
  const {cartCount, isGetCartsProductRequest} = useSelector(state => state.products);
  const {cartsData, isUpdateCartSuccess, isDeleteCartSuccess} = useSelector(state => state.cart);
  const navigate = useNavigate();
  const prevUpdateSuccess = usePrevious(isUpdateCartSuccess);
  const prevDeleteSuccess = usePrevious(isDeleteCartSuccess);

  useEffect(() => {
    dispatch(getCartRequest(localStorage.getItem("token")));
  }, [cartCount, dispatch]);
  
  useEffect(() => {
    if (isUpdateCartSuccess && prevUpdateSuccess === false) {
      dispatch(getCartRequest(localStorage.getItem("token")));
    }
    if (isDeleteCartSuccess && prevDeleteSuccess === false) {
      dispatch(getCartRequest(localStorage.getItem("token")));
    }
  }, [dispatch, isDeleteCartSuccess, isUpdateCartSuccess, prevDeleteSuccess, prevUpdateSuccess])


  const {products, savedProducts} = cartsData;
  const totalPrice = () => {
    let price = 0;
    let count = 0
    products.forEach(prod => {
      price += (prod.count * prod.price);
      count += prod.count;
    })
    return {price, count};
  };


  return <Layout style={{padding: "0 50px"}}>
    <Skeleton active loading={isGetCartsProductRequest}>
      <Layout hasSider>
        <Content style={{textAlign: "center", padding: "20px 20px 20px 0"}}>
          <Title style={{backgroundColor: "white", padding: "20px 0", border: "0.5px solid grey", borderRadius: "10px"}}>Shopping
            Cart</Title>
          <Space direction="vertical" style={{width: "100%"}}>
            {products?.length > 0 ? products.map(product => (
              <Card key={product.id} style={{border: "0.5px solid grey", textAlign: "center"}} className="cart">
                <Space>
                  <Image
                    width={300}
                    src={`http://localhost:3001/${product.image}`}
                  />
                </Space>
                <Space direction="vertical" style={{columnGap: 0, textAlign: "left"}}>
                  <Title level={4} onClick={() => navigate("/" + product.id)}
                         style={{cursor: "pointer"}}>Product: {product.name}</Title>
                  <Text><b>Brand: </b>{product.brand}</Text>
                  <Title level={5}>Price: ${product.price}</Title>
                  <Text><b>Category: </b>{product.category.name}</Text>
                  <Text><b>Size: </b>{product.size}</Text>
                  <Text><b>Color: </b>{product.color}</Text>
                </Space>
                <Space>
                  <Popconfirm
                    title="Delete Product from Cart"
                    description="Are you sure to delete this product?"
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: 'red',
                        }}
                      />
                    }
                    onConfirm={() =>  dispatch(deleteCartRequest({id: product.id, token: localStorage.getItem("token")}))}
                  >
                    <Button danger >Delete</Button>
                  </Popconfirm>
                  <Button type="primary" onClick={
                    () => {
                      dispatch(updateCartRequest({id: product.id, data: {type: "saved"}, token: localStorage.getItem("token")}));
                    }
                  }>Save for Later</Button>
                  <Select
                    defaultValue={product.count}
                    onChange={(value) => dispatch(updateCartRequest({id: product.id, data: {count: value}, token: localStorage.getItem("token")}))}
                    style={{width: 50}}
                    options={[
                      {value: 1, label: 1},
                      {value: 2, label: 2},
                      {value: 3, label: 3},
                      {value: 4, label: 4},
                    ]}
                  />
                </Space>
              </Card>
            )) : (
              <Empty/>
            )
            }
          </Space>
        </Content>
        {
          products?.length > 0 ? (
            <Sider width={300} style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "0.5px solid grey",
              padding: "20px",
              margin: "20px 0 20px 0"
            }}>
              <Title level={3}>SubTotal ({totalPrice().count} items): ${totalPrice().price}</Title>
              <Button type="primary" style={{width: "100%"}} onClick={() => navigate("/signin")}>Proceed to
                checkout</Button>
            </Sider>
          ) : null
        }
      </Layout>
      <Footer style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
      }}>
        <Title style={{textAlign: "center"}}>Saved for later</Title>
        {savedProducts?.length > 0 ? (
          <Space wrap style={{justifyContent: "left", padding: "10px"}}>
            {savedProducts.map(savedProduct => (
              <Card
                key={savedProduct.id}
                hoverable
                style={{width: 240, margin: "10px"}}
                cover={<img alt="example" src={`http://localhost:3001/${savedProduct.image}`} onClick={() => navigate("/" + savedProduct.id)}/>}
                bodyStyle={{flexDirection: "column", display: "flex", gap: "10px"}}
              >
                <Meta title={savedProduct.name} />
                <Text>{savedProduct.brand}</Text>
                <Text><b>Price: </b> ${savedProduct.price}</Text>
                <Text><b>Category: </b>{savedProduct.category.name}</Text>
                <Text><b>Color: </b> {savedProduct.color}</Text>
                <Text><b>Size: </b> {savedProduct.size}</Text>
                <Button type="default" style={{width: "100%"}} onClick={
                  () => {
                    dispatch(updateCartRequest({id: savedProduct.id, data: {type: "cart"}, token: localStorage.getItem("token")}))
                  }
                }>Move To Cart</Button>
                <Popconfirm
                  title="Delete Product from Saved For Later"
                  description="Are you sure to delete this product?"
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: 'red',
                      }}
                    />
                  }
                  onConfirm={
                    () => dispatch(deleteCartRequest({id: savedProduct.id, token: localStorage.getItem("token")}))
                  }
                >
                  <Button danger >Delete</Button>
                </Popconfirm>
              </Card>
            ))}
          </Space>) : <Empty/>}
      </Footer>
    </Skeleton>
  </Layout>
}