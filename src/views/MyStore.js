import {Content} from "antd/es/layout/layout";
import {Button, Empty, Skeleton, Space, Switch} from "antd";
import {CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import {useDispatch, useSelector} from "react-redux";
import {usePrevious} from "../usePrevious/usePrevious";
import {getUserProductsRequest} from "../redux/products/actions";
import {useNavigate} from "react-router-dom";

export default function MyStore() {
  const { products, isGetUserProductsRequest, isGetUserProductsSuccess } = useSelector(state => state.products)
  const [isPublished, setPublish] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevSuccess = usePrevious(isGetUserProductsSuccess);

  useEffect(() => {
    dispatch(getUserProductsRequest())
  }, [dispatch]);


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
            products?.rows?.length > 0 ?
              (products.rows.map((elem) => {
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