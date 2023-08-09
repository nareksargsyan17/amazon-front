import {
  Button,
  Card, ColorPicker,
  Empty,
  Image,
  Layout,
  notification,
  Popconfirm,
  Select,
  Skeleton,
  Space,
  Typography
} from "antd";
import "../App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { deleteCartRequest, getCartRequest, updateCartRequest} from "../redux/cart/actions";
import { usePrevious } from "../usePrevious/usePrevious";
import { addCartProducts, changeCartCountRequest } from "../redux/products/actions";
import { postSessionRequest } from "../redux/orders/actions";
import { getAddressesRequest } from "../redux/addresses/actions";

const { Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card

export default function AuthCart() {
  const {cartCount, isGetCartsProductRequest} = useSelector(state => state.products);
  const {cartsData, isUpdateCartSuccess, isDeleteCartSuccess, isGetCartSuccess, updatedCart, deletedCartId} = useSelector(state => state.cart);
  const { isPostSessionSuccess, url } = useSelector(state => state.orders)
  const { addresses, isGetAddressesSuccess } = useSelector(state => state.addresses)
  const dispatch = useDispatch();
  const [cartArr, setCart] = useState(cartsData);
  const navigate = useNavigate();
  const prevUpdateSuccess = usePrevious(isUpdateCartSuccess);
  const prevDeleteSuccess = usePrevious(isDeleteCartSuccess);
  const prevGetSuccess = usePrevious(isGetCartSuccess);
  const prevGetAddressesSuccess = usePrevious(isGetAddressesSuccess)



  useEffect(() => {
      dispatch(getCartRequest());
  }, [dispatch])


  useEffect(() => {
    if (isGetCartSuccess && prevGetSuccess === false) {
      setCart(cartsData);
    }
  }, [cartsData, isGetCartSuccess, prevGetSuccess])



  useEffect(() => {
   if (isUpdateCartSuccess && prevUpdateSuccess === false) {
     let newCartCount = cartCount;
     const newCartsData = {products: [], savedProducts: []};
     const foundCart = cartArr.products.find(elem => elem.id === updatedCart.id);
     const foundSavedCart = cartArr.savedProducts.find(elem => elem.id === updatedCart.id);
     if (foundCart) {
       if (updatedCart.type === "saved") {
         newCartsData.products = cartArr.products.filter(elem => elem.id !== updatedCart.id);
         newCartsData.savedProducts = [...cartArr.savedProducts];
         newCartsData.savedProducts.push(cartArr.products.find(elem => elem.id === updatedCart.id));
         newCartCount = cartCount - foundCart.count;
       } else {
         newCartsData.savedProducts = [...cartArr.savedProducts];
         newCartsData.products = cartArr.products.map(elem => {
           if (elem.id === updatedCart.id && elem.count !== updatedCart.count) {
             newCartCount = cartCount - elem.count + updatedCart.count
             return {...elem, count: updatedCart.count}
           }
           return elem;
         });
       }
     }
     if (foundSavedCart){
       newCartsData.savedProducts = cartArr.savedProducts.filter(elem => elem.id !== updatedCart.id);
       newCartsData.products = [...cartArr.products];
       newCartsData.products.push(cartArr.savedProducts.find(elem => elem.id === updatedCart.id));
       newCartCount = cartCount + foundSavedCart.count
     }
     setCart(newCartsData);
     dispatch(changeCartCountRequest(newCartCount))
   }

  }, [cartArr, cartCount, dispatch, isUpdateCartSuccess, prevUpdateSuccess, updatedCart])


  useEffect(() => {
    if (isDeleteCartSuccess && prevDeleteSuccess === false) {
      const newCartsData = {products: [], savedProducts: []};
      const deletedElem = cartArr.products.find(elem => elem.id === deletedCartId);
      let newCount = cartCount;
      if (deletedElem) {
        newCount = cartCount - deletedElem.count
      }
      newCartsData.products = cartArr.products.filter(elem => elem.id !== deletedCartId);
      newCartsData.savedProducts = cartArr.savedProducts.filter(elem => elem.id !== deletedCartId);
      setCart(newCartsData);
      dispatch(changeCartCountRequest(newCount));

    }
  }, [cartArr, cartCount, deletedCartId, dispatch, isDeleteCartSuccess, prevDeleteSuccess])


  useEffect(() => {
    if (isPostSessionSuccess) {
      window.location.href = url
    }
  }, [isPostSessionSuccess, prevGetAddressesSuccess, url])

  const {products, savedProducts} = cartArr;


  useEffect(() => {
    if (isGetAddressesSuccess && prevGetAddressesSuccess === false) {
      if (addresses.length === 0) {
        notification["error"]({
          duration: 3,
          description: "Please Add your Address"
        });
      } else {
        dispatch(postSessionRequest({products, addresses}))
        dispatch(addCartProducts(products))
      }
    }
  }, [addresses, dispatch, isGetAddressesSuccess, prevGetAddressesSuccess, products])

  function totalPrice() {
    let price = 0;
    let count = 0
    products.forEach(prod => {
      price += (prod.count * prod.price);
      count += prod.count;
    })
    return {price, count};
  }

  return <Layout style={{padding: "0 50px"}}>
    <Skeleton active loading={isGetCartsProductRequest}>
      <Layout hasSider>
        <Content style={{textAlign: "center", padding: "20px 20px 20px 0"}}>
          <Title style={{backgroundColor: "white", padding: "20px 0", border: "0.5px solid grey", borderRadius: "10px"}}>Shopping
            Cart</Title>
          <Space direction="vertical" style={{width: "100%"}}>
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
                    <Title level={4} onClick={() => navigate("/" + product.productId)}
                           style={{cursor: "pointer"}}>Product: {product.name}</Title>
                    <Text><b>Brand: </b>{product.brand}</Text>
                    <Title level={5}>Price: ${product.price}</Title>
                    <Text><b>Category: </b>{product.category}</Text>
                    <Text><b>Size: </b>{product.size}</Text>
                    <Text style={{display: "flex", alignItems: "center", columnGap: "5px"}}><b>Color:</b><ColorPicker disabled={true} defaultValue={product.color}/></Text>
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
                    onConfirm={() =>  dispatch(deleteCartRequest(product.id))}
                  >
                    <Button danger >Delete</Button>
                  </Popconfirm>
                  <Button type="primary" onClick={
                    () => {
                      dispatch(updateCartRequest({id: product.id, data: {type: "saved"}}));
                    }
                  }>Save for Later</Button>
                  <Select
                    defaultValue={product.count}
                    onChange={(value) => dispatch(updateCartRequest({id: product.id, data: {count: value}}))}
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
              <Button type="primary" style={{width: "100%"}} onClick={() => {
                dispatch(getAddressesRequest())
              }}>Proceed to
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
                cover={<img alt="example" src={`http://localhost:3001/${savedProduct.image}`} onClick={() => navigate("/" + savedProduct.productId)}/>}
                bodyStyle={{flexDirection: "column", display: "flex", gap: "10px"}}
              >
                <Meta title={savedProduct.name} />
                <Text>{savedProduct.brand}</Text>
                <Text><b>Price: </b> ${savedProduct.price}</Text>
                <Text><b>Category: </b>{savedProduct.category}</Text>
                <Text style={{display: "flex", alignItems: "center", columnGap: "5px"}}><b>Color: </b><ColorPicker disabled={true} defaultValue={savedProduct.color}/></Text>
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
                    () => dispatch(deleteCartRequest(savedProduct.id))
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