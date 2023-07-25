import { useState } from 'react';
import { Pagination, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getProductsRequest } from "../../redux/products/actions";

export default function PaginationBar() {
  const [current, setCurrent] = useState(1);
  const {filterState, products} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const onChange = (page) => {
    setCurrent(page);
    dispatch(getProductsRequest({...filterState, page}));
  };

  return (
    <Space style={{display: products?.rows?.length > 0 ? "flex" : "none", justifyContent: "center"}}>
      <Pagination current={current} onChange={onChange} total={products?.count}/>
    </Space>);
}