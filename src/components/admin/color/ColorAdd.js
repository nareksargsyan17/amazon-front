import {Button, ColorPicker, Form, notification, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {postColorsRequest} from "../../../redux/colors/actions";
const { Title } = Typography;

export default function ColorAdd() {
  const { isPostColorsSuccess, isPostColorsFailure, isPostColorsRequest, errorMessage } = useSelector(state => state.colors);
  const dispatch = useDispatch();
  const [color, setColor] = useState("blue");

  useEffect(() => {
    if (isPostColorsSuccess) {
      notification["success"]({
        duration: 3,
        description: "Color Created"
      });
    }

    if (isPostColorsFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [dispatch, errorMessage, isPostColorsFailure, isPostColorsSuccess])

  const onFinish = (color) => {
    dispatch(postColorsRequest({color: color.color.toHexString()}))
  }


  return <Form style={{border: "1px solid grey", padding: "100px", borderRadius: "10px"}}
               onFinish={onFinish}
  >
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Add new Color</Title>
    <Form.Item
      name="color"
      label="Color"
      hasFeedback
      rules={[{ required: true, message: 'Please Type Color' }]}
    >
      <ColorPicker showText value={color} onChange={setColor} />
    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
      <Space>
        <Button loading={isPostColorsRequest} type="primary" htmlType="submit">
          Add
        </Button>
      </Space>
    </Form.Item>
  </Form>
}