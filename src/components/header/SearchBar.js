import Search from "antd/es/input/Search";

export function SearchBar() {
  const onSearch = (value) => console.log(value);
  return (
    <Search placeholder="Search Products" onSearch={onSearch} style={{ width: 300 }} />
  )
}