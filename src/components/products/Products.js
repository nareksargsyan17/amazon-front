import {Space, Spin} from "antd";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProductsRequest } from "../../redux/products/actions";
import { LoadingOutlined } from "@ant-design/icons";


export function Products() {
  const dispatch = useDispatch();
  const {products, isGetProductsRequest} = useSelector(state => state.products);


  useEffect(() => {
    dispatch(getProductsRequest());
  }, [dispatch]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  return (
    <Space wrap>
      {
        !isGetProductsRequest ? products.map((elem) => <Card
            key={elem.id}
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={`http://localhost:3001/${elem.images[0].path}`} />}
          >
            <Meta title={elem.name} description={elem.brand} />
            <Meta title={elem.price}/>
          </Card>) : <Spin indicator={antIcon} />
      }
    </Space>
  )
}