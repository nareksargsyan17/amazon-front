import {Select, Space, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getProductsRequest} from "../../redux/products/actions";
const { Text } = Typography;


export default function SortBar() {
  const { filterState } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleChange = (value) => {
    value = JSON.parse(value);
    console.log(value)
    dispatch(getProductsRequest({...filterState, ...value}));
  };
  return <>
    <Space direction="vertical">
      <Text>Sorting</Text>
      <Select
        style={{ width: 200 }}
        defaultValue={JSON.stringify({ sortDirection: "Desc", sortWith: "id" })}
        onChange={handleChange}
        options={[
          {
            label: "Featured",
            options: [
              { label: "Featured", value: JSON.stringify({ sortDirection: "Desc", sortWith: "id" })}
            ]
          },
          {
            label: 'Price',
            options: [
              { label: 'Low to High', value: JSON.stringify({sortDirection: "ASC", sortWith: "price"})},
              { label: 'High to Low', value: JSON.stringify({sortDirection: "DESC", sortWith: "price"})},
            ],
          },
          {
            label: 'Date',
            options: [
              { label: 'New to Old', value: JSON.stringify({sortDirection: "DESC", sortWith: "createdAt"})},
              { label: 'Old to New', value: JSON.stringify({sortDirection: "ASC", sortWith: "createdAt"})}
            ],
          },
        ]}
      />
    </Space>
  </>

}