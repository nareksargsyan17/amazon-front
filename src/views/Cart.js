import {Button, Card, ColorPicker, Empty, Image, Layout, Popconfirm, Select, Skeleton, Space, Typography} from "antd";
import "../App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeCartCountRequest, getCartsProductsRequest} from "../redux/products/actions";
import counter from "../counter/counter";
import { useNavigate } from "react-router-dom";
import {QuestionCircleOutlined} from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card

export default function Cart() {
  const [cartProducts, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);
  const [savedCartsProducts, setSavedProducts] = useState(JSON.parse(localStorage.getItem("savedProducts")) || []);
  const dispatch = useDispatch();
  const {cartCount, cartsProducts, isGetCartsProductRequest} = useSelector(state => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartsProductsRequest({products: cartProducts, savedProducts: savedCartsProducts}))
    dispatch(changeCartCountRequest(cartCount));
  }, [cartCount, cartProducts, dispatch, savedCartsProducts]);


  const {products, savedProducts} = cartsProducts;
  const totalPrice = () => {
    let price = 0;
    let count = 0
    products.forEach(prod => {
      price += (prod.count * prod.price);
      count += prod.count;
    })
    return {price, count};
  };

  const filteringForStorage = (productsArr) => {
    return productsArr.map(product => ({
      id: product.id,
      count: product.count,
      size: product.size,
      color: product.color
    }))
  }

  return <Layout style={{padding: "0 50px"}}>
    <Skeleton active loading={isGetCartsProductRequest}>
      <Layout hasSider>
        <Content style={{textAlign: "center", padding: "20px 20px 20px 0"}}>
          <Title style={{backgroundColor: "white", padding: "20px 0", border: "0.5px solid grey", borderRadius: "10px"}}>Shopping
            Cart</Title>
          <Space direction="vertical" style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "stretch"}}>
            {products?.length > 0 ? products.map(product => (
              <Card key={product.id} style={{border: "0.5px solid grey", textAlign: "center"}} className="cart">
                <Space style={{width: "100%"}}>
                  <Space style={{marginRight: "50px"}}>
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
                    <Text><b>Category: </b>{product.category}</Text>
                    <Text><b>Size: </b>{product.size}</Text>
                    <Text style={{display: "flex", alignItems: "center", columnGap: "5px"}}><b>Color: </b><ColorPicker disabled={true} defaultValue={product.color}/></Text>
                  </Space>
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
                    onConfirm={() => {
                      const newProducts = products.filter(item => item.id !== product.id);
                      setProducts(newProducts);
                      localStorage.setItem("products", JSON.stringify(filteringForStorage(newProducts)));
                      dispatch(changeCartCountRequest(counter()))}
                    }
                  >
                    <Button danger >Delete</Button>
                  </Popconfirm>
                  <Button type="primary" onClick={
                    () => {
                      const newSavedProduct = products.find(item => item.id === product.id);
                      const newProducts = products.filter(item => item.id !== product.id);
                      setSavedProducts([...savedProducts, newSavedProduct])
                      localStorage.setItem("savedProducts", JSON.stringify(filteringForStorage([...savedProducts, newSavedProduct])));
                      setProducts(newProducts);
                      localStorage.setItem("products", JSON.stringify(filteringForStorage(newProducts)));
                      dispatch(changeCartCountRequest(counter()))
                    }
                  }>Save for Later</Button>
                  <Select
                    defaultValue={product.count}
                    onChange={(value) => {
                      const products = JSON.parse(localStorage.getItem("products"));
                      const newProducts = products.map(item => {
                        if (product.id === item.id) {
                          item.count = value
                        }
                        return item
                      });
                      setProducts(newProducts);
                      localStorage.setItem("products", JSON.stringify(filteringForStorage(newProducts)));
                      dispatch(changeCartCountRequest(counter()))
                    }}
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
                <Text><b>Category: </b>{savedProduct.category}</Text>
                <Text style={{display: "flex", alignItems: "center", columnGap: "5px"}}><b>Color: </b> <ColorPicker disabled={true} defaultValue={savedProduct.color}/></Text>
                <Text><b>Size: </b> {savedProduct.size}</Text>
                <Button type="default" style={{width: "100%"}} onClick={
                  () => {
                    const newProduct = savedProducts.find(item => item.id === savedProduct.id);
                    const newSavedProducts = savedProducts.filter(item => item.id !== savedProduct.id);
                    setSavedProducts(newSavedProducts)
                    localStorage.setItem("savedProducts", JSON.stringify(filteringForStorage(newSavedProducts)));
                    setProducts([...products, newProduct]);
                    localStorage.setItem("products", JSON.stringify(filteringForStorage([...products, newProduct])));
                    dispatch(changeCartCountRequest(counter()))
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
                    () => {
                      const newSavedProducts = savedProducts.filter(item => item.id !== savedProduct.id);
                      setSavedProducts(newSavedProducts);
                      localStorage.setItem("products", JSON.stringify(filteringForStorage(newSavedProducts)));
                    }
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