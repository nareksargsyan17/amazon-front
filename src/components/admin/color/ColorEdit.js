import {Button, ColorPicker, Form, notification, Select, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeColor, getColorsRequest, updateColorsRequest} from "../../../redux/colors/actions";
import {usePrevious} from "../../../usePrevious/usePrevious";
const { Title, Text } = Typography;

export default function ColorEdit() {
  const {isGetColorsSuccess, isUpdateColorsSuccess, isUpdateColorsFailure, isUpdateColorsRequest, errorMessage, colors, changedColor } = useSelector(state => state.colors);
  const dispatch = useDispatch();
  const [defColor, setDefColor] = useState("transparent");
  const [color, setColor] = useState("");
  const [colorsArr, setColorsArr] = useState([]);
  const prevUpdateColor = usePrevious(isUpdateColorsSuccess)

  useEffect(() => {
    dispatch(getColorsRequest())
  }, [dispatch])

  useEffect(() => {
    if (isGetColorsSuccess) {
      setColorsArr(colors);
    }
  }, [colors, isGetColorsSuccess])
  
  useEffect(() => {
    if (isUpdateColorsSuccess && prevUpdateColor === false) {
      const newArr = colors.map(elem => {
        if (elem.id === changedColor.id) {
          return changedColor
        } else {
          return elem
        }
      })
      setColorsArr(newArr);
      setDefColor(changedColor.color)
      dispatch(changeColor(newArr))
      notification["success"]({
        duration: 3,
        description: "Color Updated"
      });
    }

    if (isUpdateColorsFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [changedColor, colors, dispatch, errorMessage, isUpdateColorsFailure, isUpdateColorsSuccess, prevUpdateColor])

  const onSelectColor = (value, obj) => {
    setDefColor(obj.label)
  }

  const onFinish = (obj) => {
    dispatch(updateColorsRequest({data: {color : color.toHexString()}, id: obj.id }))
  }

  return <Form
    style={{border: "1px solid grey", padding: "60px", borderRadius: "10px"}}
    onFinish={onFinish}
  >
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Edit Color</Title>
    <Form.Item
      name="id"
      label="Select Color for Edit"
    >
        <Select
          style={{ width: 120 }}
          onChange={onSelectColor}
          options={colorsArr.map((color) => ({ label: color.color, value: color.id, color: color.color }))}
        />
    </Form.Item>
    <Form.Item
      name="color"
      label="Set Color From"
      hasFeedback
      rules={[{ required: (!color || defColor === "transparent"), message: 'Please Type Color' }]}
    >
      <Space>
        <ColorPicker value={defColor} disabled={true}/>
        <Text>To</Text>
        <ColorPicker value={color} onChangeComplete={setColor} />
      </Space>
    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
      <Space>
        <Button loading={isUpdateColorsRequest} type="primary" htmlType="submit">
          Edit
        </Button>
      </Space>
    </Form.Item>
  </Form>
}