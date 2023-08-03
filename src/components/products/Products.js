import { Empty, notification, Skeleton, Space } from "antd";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsRequest } from "../../redux/products/actions";
import { useNavigate } from 'react-router-dom';
import { usePrevious } from "../../usePrevious/usePrevious";


export function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    isGetProductsRequest,
    isGetProductsFailure,
    filterState,
    errorMessage
  } = useSelector((state) => state.products);

  const prevIsGetProductsFailure = usePrevious(isGetProductsFailure);

  useEffect(() => {
    dispatch(getProductsRequest({...filterState}));
  }, [dispatch, filterState]);

  useEffect(() => {
    if (isGetProductsFailure && prevIsGetProductsFailure === false) {
      notification["error"]({
        duration: 7,
        description: errorMessage
      })
    }
  }, [isGetProductsFailure, errorMessage, prevIsGetProductsFailure]);


  return (
    <Skeleton active loading={isGetProductsRequest}>
      <Space wrap>
        {
          products?.rows?.length > 0 ?
            (products.rows.map((elem) => <Card
                key={elem.id}
                hoverable
                size="large"
                style={{width: "260px", marginBottom: "30px", height: "400px"}}
                cover={<img alt="example" src={`http://localhost:3001/${elem.images[0].path}`}/>}
                onClick={() => {
                  navigate("/" + elem.id)
                }}
              >
                <Meta title={elem.name} description={elem.brand}/>
                <Meta title={"$" + elem.price}/>
              </Card>)
            ) : (
              <Empty/>
            )
        }
      </Space>
    </Skeleton>
  )
}