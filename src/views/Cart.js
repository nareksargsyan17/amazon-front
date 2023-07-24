import {Button, Card, Empty, Image, Layout, Select, Space, Typography} from "antd";
import "../App.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeCartCountRequest} from "../redux/products/actions";
import counter from "../counter/counter";

const {Content, Footer, Sider} = Layout;
const {Title, Text} = Typography;
const {Meta} = Card

export default function Cart() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")));
  const [savedProducts, setSavedProducts] = useState(JSON.parse(localStorage.getItem("savedProducts")) || [])
  const dispatch = useDispatch();
  const {cartCount} = useSelector(state => state.products)

  const totalPrice = () => {
    let price = 0;
    products.forEach(prod => {
      price += (prod.count * prod.price)
    })
    return price
  }

  useEffect(() => {
    dispatch(changeCartCountRequest(cartCount))
  }, [cartCount, dispatch])

  return <Layout style={{padding: "0 50px"}}>
    <Layout hasSider>
      <Content style={{textAlign: "center", padding: "20px 20px 20px 0"}}>
        <Title style={{backgroundColor: "white", padding: "20px 0", border: "0.5px solid grey", borderRadius: "10px"}}>Shopping
          Cart</Title>
        <Space direction="vertical" style={{width: "100%"}}>
          {products.length > 0 ? products.map(product => (
            <Card key={product.id} style={{border: "0.5px solid grey", textAlign: "center"}} className="cart">
              <Space>
                <Image
                  width={300}
                  src={`http://localhost:3001/${product.image.path}`}
                />
              </Space>
              <Space direction="vertical" style={{columnGap: 0, textAlign: "left"}}>
                <Title level={4}>Product: {product.name}</Title>
                <Text><b>Brand: </b>{product.brand}</Text>
                <Title level={5}>Price: ${product.price}</Title>
                <Text><b>Category: </b>{product.category.name}</Text>
                <Text><b>Size: </b>{product.size}</Text>
                <Text><b>Color: </b>{product.color}</Text>
              </Space>
              <Space>
                <Button danger onClick={
                  () => {
                    const newProducts = products.filter(item => item.id !== product.id);
                    setProducts(newProducts);
                    localStorage.setItem("products", JSON.stringify(newProducts));
                    dispatch(changeCartCountRequest(counter()))
                  }}>Delete</Button>
                <Button type="primary" onClick={
                  () => {
                    const newSavedProduct = products.find(item => item.id === product.id);
                    const newProducts = products.filter(item => item.id !== product.id);
                    setSavedProducts([...savedProducts, newSavedProduct])
                    localStorage.setItem("savedProducts", JSON.stringify([...savedProducts, newSavedProduct]));
                    setProducts(newProducts);
                    localStorage.setItem("products", JSON.stringify(newProducts));
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
                    localStorage.setItem("products", JSON.stringify(newProducts));
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
        products.length > 0 ? (
          <Sider width={300} style={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "0.5px solid grey",
            padding: "20px",
            margin: "20px 0 20px 0"
          }}>
            <Title level={3}>SubTotal ({cartCount} items): ${totalPrice()}</Title>
            <Button type="primary" style={{width: "100%"}}>Proceed to checkout</Button>
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
      {savedProducts.length > 0 ? (
        <Space wrap style={{justifyContent: "left", padding: "10px"}}>
          {savedProducts.map(savedProduct => (
            <Card
              key={savedProduct.id}
              hoverable
              style={{width: 240, margin: "10px"}}
              cover={<img alt="example" src={`http://localhost:3001/${savedProduct.image.path}`}/>}
              bodyStyle={{flexDirection: "column", display: "flex", gap: "10px"}}
            >
              <Meta title={savedProduct.name}/>
              <Text>{savedProduct.brand}</Text>
              <Text><b>Price: </b> ${savedProduct.price}</Text>
              <Text><b>Category: </b>{savedProduct.category.name}</Text>
              <Text><b>Color: </b> {savedProduct.color}</Text>
              <Text><b>Size: </b> {savedProduct.size}</Text>
              <Button type="default" style={{width: "100%"}} onClick={
                () => {
                  const newProduct = savedProducts.find(item => item.id === savedProduct.id);
                  const newSavedProducts = savedProducts.filter(item => item.id !== savedProduct.id);
                  setSavedProducts(newSavedProducts)
                  localStorage.setItem("savedProducts", JSON.stringify(newSavedProducts));
                  setProducts([...products, newProduct]);
                  localStorage.setItem("products", JSON.stringify([...products, newProduct]));
                  dispatch(changeCartCountRequest(counter()))
                }
              }>Move To Cart</Button>
              <Button danger style={{width: "100%"}} onClick={
                () => {
                  const newSavedProducts = savedProducts.filter(item => item.id !== savedProduct.id);
                  setSavedProducts(newSavedProducts);
                  localStorage.setItem("products", JSON.stringify(newSavedProducts));
                }}>Delete</Button>
            </Card>
          ))}
        </Space>) : <Empty/>}
    </Footer>
  </Layout>
}