import {Content} from "antd/es/layout/layout";
import {Button, Empty, Popconfirm, Skeleton, Space, Switch} from "antd";
import {CheckOutlined, CloseOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import {useDispatch, useSelector} from "react-redux";
import {usePrevious} from "../usePrevious/usePrevious";
import {deleteProductRequest, getUserProductsRequest} from "../redux/products/actions";
import {useNavigate} from "react-router-dom";

export default function MyStore() {
  const { products, isGetUserProductsRequest, isGetUserProductsSuccess } = useSelector(state => state.products)
  const [isPublished, setPublish] = useState(true);
  const [productsList, setProducts] = useState(products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevSuccess = usePrevious(isGetUserProductsSuccess);

  useEffect(() => {
    dispatch(getUserProductsRequest())
  }, [dispatch]);

  useEffect(() => {
    if (prevSuccess === false && isGetUserProductsSuccess) {
      setProducts(products);
    }
  }, [isGetUserProductsSuccess, prevSuccess, products])


  return (
    <Content  style={{margin: "0 50px", padding: "30px", backgroundColor: "white"}}>
      <Space
        style={{display: "flex", justifyContent: "space-between", margin: "30px 0"}}
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={isPublished}
          onChange={() => setPublish(!isPublished)}
        />
        <Button type="primary" onClick={() => navigate("./add")}>Add Product<PlusOutlined /></Button>
      </Space>

      <Skeleton active loading={isGetUserProductsRequest}>
        <Space wrap>
          {
            productsList?.rows?.length > 0 ?
              (productsList.rows.map((elem) => {
                if (elem.isPublished === isPublished) {
                  return <Card
                    key={elem.id}
                    hoverable
                    size="large"
                    style={{width: "260px", marginBottom: "30px"}}
                    cover={<img alt="example" src={`http://localhost:3001/${elem.images[0].path}`}/>}
                  >
                    <Meta title={elem.name} description={elem.brand}/>
                    <Meta title={"$" + elem.price}/>

                    <Space style={{margin: "20px 0"}}>
                      <Button type="primary" onClick={() => navigate("./edit/" + elem.id)}>Edit</Button>
                      <Popconfirm
                        title="Delete Product from Store?"
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
                            dispatch(deleteProductRequest(elem.id));
                            const newList = productsList.rows.filter(element => element.id !== elem.id);
                            setProducts(newList);
                          }
                        }
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                    </Space>
                  </Card>
                } else {
                   return null
                }

              })
              ) : (
                <Empty/>
              )
          }
        </Space>
      </Skeleton>
    </Content>
  )
}