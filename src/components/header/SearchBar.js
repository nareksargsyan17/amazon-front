import Search from "antd/es/input/Search";
import { useSelector, useDispatch } from "react-redux";
import { changeFilterRequest } from "../../redux/products/actions";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const {filterState} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearch = (value) => {
    dispatch(changeFilterRequest({...filterState, searchBy: value}));
    navigate("/");
  };
  return (
    <Search placeholder="Search Products" onSearch={onSearch} style={{width: 300}}/>
  )
}