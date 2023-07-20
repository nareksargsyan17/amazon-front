import { Space, Typography } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getColorsRequest} from "../../redux/colors/actions";
import CheckableTag from "antd/es/tag/CheckableTag";
import {getProductsRequest} from "../../redux/products/actions";

const {Text} = Typography;

export default function ColorsPicker() {
  const dispatch = useDispatch();
  const { colors } = useSelector(state => state.colors);
  const { filterState } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(getColorsRequest())
  }, [dispatch])


  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag.id]
      : selectedTags.filter((t) => t !== tag.id);
    dispatch(getProductsRequest({...filterState, color: [...nextSelectedTags]}))
    setSelectedTags(nextSelectedTags);
  };
  return (
    <>
      <Space direction="vertical">
        <Text
          style={{
            marginRight: 8,
          }}
        >
          Colors:
        </Text>
        <Space size={[0, 8]} wrap>
          {colors.map((tag) => (
            <CheckableTag
              key={tag.id}
              checked={selectedTags.includes(tag.id)}
              style={{background: tag.color, boxShadow: selectedTags.includes(tag.id) ? `0px 0px 1px 2px grey` : "none",border: "0.05px solid black",  width: "20px", height: "20px"}}
              onChange={(checked) => handleChange(tag, checked)}
            >
            </CheckableTag>
          ))}
        </Space>
      </Space>
    </>
  );
}