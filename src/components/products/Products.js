import {Space, Spin, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {getProductsRequest} from "../../redux/products/actions";
import {LoadingOutlined} from "@ant-design/icons";

const { Title } = Typography;

export function Products() {
  const dispatch = useDispatch();
  const {products, isGetProductsRequest, filterState} = useSelector((state) => state.products);
  console.log(products)
  useEffect(() => {
    dispatch(getProductsRequest({...filterState, id: "all", sortDirection: "ASC"}));
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
        !isGetProductsRequest ? products.rows?.length > 0 ?
            (products.rows.map((elem) => <Card
              key={elem.id}
              hoverable
              size="large"
              style={{width: "260px", marginBottom: "30px"}}
              cover={<img alt="example" src={`http://localhost:3001/${elem.images[0].path}`}/>}
            >
              <Meta title={elem.name} description={elem.brand}/>
              <Meta title={elem.price}/>
            </Card>)) :
            (<Title type="danger" level={5} >There is not found Products!!</Title>) :
          <Spin indicator={antIcon}/>
      }
    </Space>
  )
}