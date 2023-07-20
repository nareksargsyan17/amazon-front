import Search from "antd/es/input/Search";
import {useSelector, useDispatch} from "react-redux";
import {getProductsRequest} from "../../redux/products/actions";

export function SearchBar() {
  const { filterState } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const onSearch = (value) => {
    console.log(value)
    dispatch(getProductsRequest({...filterState, searchBy: value}));
  };
  return (
    <Search placeholder="Search Products" onSearch={onSearch} style={{ width: 300 }} />
  )
}