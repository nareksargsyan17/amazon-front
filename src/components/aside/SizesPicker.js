import { Space, Typography } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CheckableTag from "antd/es/tag/CheckableTag";
import {changeFilterRequest} from "../../redux/products/actions";
import {getSizesRequest} from "../../redux/sizes/actions";

const {Text} = Typography;

export default function SizesPicker() {
  const dispatch = useDispatch();
  const { sizes } = useSelector(state => state.sizes);
  const { filterState } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSizesRequest())
  }, [dispatch])


  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag.id]
      : selectedTags.filter((t) => t !== tag.id);
    dispatch(changeFilterRequest({...filterState, size: [...nextSelectedTags]}))
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
          Sizes:
        </Text>
        <Space size={[0, 8]} wrap>
          {sizes.map((tag) => (
            <CheckableTag
              key={tag.id}
              checked={selectedTags.includes(tag.id)}
              onChange={(checked) => handleChange(tag, checked)}
              style={{background: !selectedTags.includes(tag.id) ? "rgb(219,219,219)" : "#1677ff"}}
            >
              {tag.size}
            </CheckableTag>
          ))}
        </Space>
      </Space>
    </>
  );
}