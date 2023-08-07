import {Button, ColorPicker, Form, Input, notification, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {postColorsRequest} from "../../../redux/colors/actions";
import {postSizesRequest} from "../../../redux/sizes/actions";
const { Title } = Typography;

export default function SizeAdd() {
  const { errorMessage, isPostSizesSuccess, isPostSizesFailure } = useSelector(state => state.sizes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPostSizesSuccess) {
      notification["success"]({
        duration: 3,
        description: "Size Created"
      });
    }

    if (isPostSizesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [dispatch, errorMessage, isPostSizesFailure, isPostSizesSuccess])

  const onFinish = (size) => {
    dispatch(postSizesRequest(size))
  }


  return <Form style={{border: "1px solid grey", padding: "60px", borderRadius: "10px"}}
               onFinish={onFinish}
  >
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Add new Size</Title>
    <Form.Item
      name="size"
      label="Size"
      hasFeedback
      rules={[{ required: true, message: 'Please Type Color' }]}
    >
      <Input type="text"/>
    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
      <Space>
        <Button loading={false} type="primary" htmlType="submit">
          Add
        </Button>
      </Space>
    </Form.Item>
  </Form>
}