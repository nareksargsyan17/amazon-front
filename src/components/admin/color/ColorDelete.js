import {Button, ColorPicker, Form, notification, Popconfirm, Select, Space, Typography} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeColor, deleteColorsRequest, getColorsRequest} from "../../../redux/colors/actions";
import {usePrevious} from "../../../usePrevious/usePrevious";

const {Title} = Typography;

export default function ColorDelete() {
  const {isGetColorsSuccess, isDeleteColorsSuccess, isDeleteColorsFailure, isDeleteColorsRequest, errorMessage, colors, deletedColorId } = useSelector(state => state.colors);
  const dispatch = useDispatch();
  const [colorsArr, setColorsArr] = useState([]);
  const [color, setColor] = useState({});
  const prevDeleteColorSuccess = usePrevious(isDeleteColorsSuccess)

  useEffect(() => {
    if (isGetColorsSuccess) {
      setColorsArr(colors);
    }
  }, [colors, isGetColorsSuccess])


  useEffect(() => {
    if (isDeleteColorsSuccess && prevDeleteColorSuccess === false) {
      const newArr = colorsArr.filter((elem) => elem.value !== deletedColorId);
      setColor({})
      setColorsArr(newArr);
      dispatch(changeColor(newArr));
      notification["success"]({
        duration: 3,
        description: "Color Deleted"
      });
    }
    if (isDeleteColorsFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [colorsArr, deletedColorId, dispatch, errorMessage, isDeleteColorsFailure, isDeleteColorsSuccess, prevDeleteColorSuccess])


  return <Form style={{border: "1px solid grey", padding: "60px", borderRadius: "10px"}}>
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Delete Color</Title>
    <Form.Item
      name="id"
      label="Select Color for Delete"
    >
      <Space>
        <Select
          style={{ width: 120 }}
          onFocus={() => dispatch(getColorsRequest())}
          onChange={((value, obj) => setColor(obj))}
          options={colorsArr.map((color) => ({ label: color.color, value: color.id}))}
        />
        <ColorPicker value={color.label} disabled={true}/>
      </Space>

    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
      <Space>
        <Popconfirm
          disabled={!color?.value}
          title="Delete Category"
          description="Are you sure to delete this category?"
          icon={
            <QuestionCircleOutlined
              style={{
                color: 'red',
              }}
            />
          }
          onConfirm={() => dispatch(deleteColorsRequest(color.value))}
        >
          <Button danger disabled={!color?.value} loading={isDeleteColorsRequest}>Delete</Button>
        </Popconfirm>
      </Space>
    </Form.Item>
  </Form>
}