import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCartCountRequest, getProductRequest } from "../redux/products/actions";
import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Descriptions,
  Image,
  Layout,
  Result,
  Skeleton,
  Typography,
  notification,
  Select,
  Radio
} from "antd";
import Card from "antd/es/card/Card";
import "../App.css"
import { ShoppingCartOutlined } from "@ant-design/icons";
import counter from "../counter/counter";
import {postCartRequest} from "../redux/cart/actions";

const { Content } = Layout;
const { Text } = Typography;

export default function Product() {
  let { productId } = useParams();
  const dispatch = useDispatch();
  const {
    isGetProductFailure,
    isGetProductRequest,
    isGetProductSuccess,
    product
  } = useSelector(state => state.products);
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (isGetProductSuccess && product?.name) {
      setColor(product.colors[0].color);
      setSize(product.sizes[0].size);
    }
  }, [isGetProductSuccess, product?.name, product?.colors, product?.sizes]);

  useEffect(() => {
    dispatch(getProductRequest({productId}));
  }, [dispatch, productId]);

  const onToCart = () => {
    let productsInStorage = localStorage.getItem("products");
    let savedProductsInStorage = localStorage.getItem("savedProducts");
    const { id } = product;
    if (productsInStorage) {
      productsInStorage = JSON.parse(productsInStorage);
      savedProductsInStorage = JSON.parse(savedProductsInStorage);
      if (!productsInStorage.find(elem => elem.id === product.id) && !savedProductsInStorage?.find(elem => elem.id === product.id)) {
        productsInStorage.push({id, color, size, count});
        localStorage.setItem("products", JSON.stringify(productsInStorage));
        if (localStorage.getItem("token")) {
          dispatch(postCartRequest({data: {id, color, size, count}, token: localStorage.getItem("token")}))
        }
        dispatch(changeCartCountRequest(counter()));
        notification["success"]({
          duration: 3,
          description: "This Product added in the Cart"
        })
      } else {
        notification["warning"]({
          duration: 3,
          description: "This Product already exists in the Cart"
        });
      }
    } else {
      if (localStorage.getItem("token")) {
        dispatch(postCartRequest({data: {id, color, size, count}, token: localStorage.getItem("token")}))
      }
      localStorage.setItem("products", JSON.stringify([{
        id,
        color,
        size,
        ...{count}
      }]));
      dispatch(changeCartCountRequest(count));
      notification["success"]({
        duration: 3,
        description: "This Product added in the Cart"
      });
    }

  }

  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
    display: "flex",
    justifyContent: "center",
    padding: "40px"
  };

  const images = () => {
    const imagesArr = [];
    imagesArr.push(product.images.find(elem => elem.isMain === true).path);
    product.images.filter(elem => elem.isMain === false).forEach(image => {
      imagesArr.push(image.path);
    })
    return imagesArr;
  }

  const handleChange = (value) => {
    setCount(value);
  };

  const onSetSize = (e) => {
    setSize(e.target.value);
  };

  const onSetColor = (e) => {
    setColor(e.target.value);
  };

  return (
    <Layout style={{minHeight: "100%", padding: "0 50px"}}>
      <Skeleton active loading={isGetProductRequest}>
        {
          !isGetProductFailure && product?.name ? (
            <Content style={contentStyle}>
              <Card title={product.name} bordered={true} style={{maxWidth: 800}}>
                <Carousel effect="fade" dots={{className: "dots"}} style={{width: "100%", padding: "20px 0"}}>
                  {
                    images().map((imagePath, index) => <Image key={index} width={300}
                                                              src={`http://localhost:3001/${imagePath}`}/>)
                  }
                </Carousel>
                <Descriptions title="Product Info" layout="vertical" bordered>
                  <Descriptions.Item label="Product">{product.name}</Descriptions.Item>
                  <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
                  <Descriptions.Item label="Price">${product.price}</Descriptions.Item>
                  <Descriptions.Item label="Create time">{product.createdAt}</Descriptions.Item>
                  <Descriptions.Item
                    label="Created By">{product.owner.firstName + " " + product.owner.lastName}</Descriptions.Item>
                  <Descriptions.Item label="Category">{product.category.name}</Descriptions.Item>
                  <Descriptions.Item label="Colors" span={2}>{
                    <Radio.Group onChange={onSetColor} defaultValue={product.colors[0].color}>
                      {product.colors.map((tag) => (
                        <Radio.Button key={tag.id} value={tag.color} style={{
                          backgroundColor: tag.color,
                          width: "30px",
                          height: " 30px",
                          margin: "3px",
                          borderRadius: "3px"
                        }}></Radio.Button>
                      ))}
                    </Radio.Group>
                  }</Descriptions.Item>
                  <Descriptions.Item label="Sizes">
                    <Radio.Group onChange={onSetSize} defaultValue={product.sizes[0].size}>
                      {product.sizes.map((tag) => (
                        <Radio.Button key={tag.id} value={tag.size}>{tag.size}</Radio.Button>
                      ))}
                    </Radio.Group>
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {product.description}
                  </Descriptions.Item>
                </Descriptions>
                <div style={{
                  paddingTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px"
                }}>
                  <Text>Add to Cart:</Text>
                  <Button type="default" onClick={onToCart}>
                    <ShoppingCartOutlined style={{color: "#1677ff", fontSize: "25px", cursor: "pointer"}}/>
                  </Button>
                  <Text>Count:</Text>
                  <Select
                    defaultValue="1"
                    style={{width: 50}}
                    onChange={handleChange}
                    options={[
                      {value: 1, label: 1},
                      {value: 2, label: 2},
                      {value: 3, label: 3},
                      {value: 4, label: 4},
                    ]}
                  />
                </div>
              </Card>
            </Content>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary">Back Home</Button>}
            />)
        }
      </Skeleton>
    </Layout>

  )
}