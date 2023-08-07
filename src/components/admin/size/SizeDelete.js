import {Button, ColorPicker, Form, notification, Popconfirm, Select, Space, Typography} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeColor, deleteColorsRequest, getColorsRequest} from "../../../redux/colors/actions";
import {usePrevious} from "../../../usePrevious/usePrevious";
import {deleteSizesRequest} from "../../../redux/sizes/actions";

const {Title} = Typography;

export default function SizeDelete() {
  const { errorMessage, isDeleteSizesSuccess, isDeleteSizesFailure, sizes, isGetSizesSuccess, deletedSizeId } = useSelector(state => state.sizes);

  const dispatch = useDispatch();
  const [sizesArr, setSizesArr] = useState([]);
  const [size, setSize] = useState("")
  const prevDeleteSizeSuccess = usePrevious(isDeleteSizesSuccess);

  useEffect(() => {
    if (isGetSizesSuccess) {
      setSizesArr(sizes);
    }
  }, [isGetSizesSuccess, sizes])


  useEffect(() => {
    if (isDeleteSizesSuccess && prevDeleteSizeSuccess === false) {
      console.log(deletedSizeId)
      const newArr = sizesArr.filter((elem) => elem.id !== deletedSizeId);
      console.log(newArr)
      setSize("")
      setSizesArr(newArr);
      dispatch(changeColor(newArr));
      notification["success"]({
        duration: 3,
        description: "Size Deleted"
      });
    }
    if (isDeleteSizesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [deletedSizeId, dispatch, errorMessage, isDeleteSizesFailure, isDeleteSizesSuccess, prevDeleteSizeSuccess, sizesArr])

  const onSelectColor = (value, obj) => {
    setSize(value)
  }

  return <Form style={{border: "1px solid grey", padding: "60px", borderRadius: "10px"}}>
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Delete Size</Title>
    <Form.Item
      name="id"
      label="Select Size for Delete"
    >
      <Select
        style={{ width: 120 }}
        onChange={onSelectColor}
        options={sizesArr.map((size) => ({ label: size.size, value: size.id}))}
      />

    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
      <Space>
        <Popconfirm
          disabled={!size}
          title="Delete Category"
          description="Are you sure to delete this category?"
          icon={
            <QuestionCircleOutlined
              style={{
                color: 'red',
              }}
            />
          }
          onConfirm={() => dispatch(deleteSizesRequest(size))}
        >
          <Button danger disabled={!size} loading={false}>Delete</Button>
        </Popconfirm>
      </Space>
    </Form.Item>
  </Form>
}