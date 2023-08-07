import {Button, ColorPicker, Form, Input, notification, Select, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeColor, getColorsRequest, updateColorsRequest} from "../../../redux/colors/actions";
import {usePrevious} from "../../../usePrevious/usePrevious";
import {changeSize, getSizesRequest, updateSizesRequest} from "../../../redux/sizes/actions";
const { Title, Text } = Typography;

export default function SizeEdit() {
  const { errorMessage, isUpdateSizesSuccess,isUpdateSizesFailure, sizes, isGetSizesSuccess, updatedSize } = useSelector(state => state.sizes);

  const dispatch = useDispatch();
  const [sizesArr, setSizesArr] = useState([]);
  const [form] = Form.useForm();

  const sizeField = Form.useWatch('size', { form, preserve: true })
  const prevUpdateSize = usePrevious(isUpdateSizesSuccess)

  useEffect(() => {
    dispatch(getSizesRequest());
  }, [dispatch])

  useEffect(() => {
    if (isGetSizesSuccess) {
      setSizesArr(sizes);
    }
  }, [isGetSizesSuccess, sizes])
  
  useEffect(() => {
    if (isUpdateSizesSuccess && prevUpdateSize === false) {
      const newArr = sizesArr.map(elem => {
        if (elem.id === updatedSize.id) {
          return updatedSize
        } else {
          return elem
        }
      })
      setSizesArr(newArr);
      dispatch(changeSize(newArr));
      notification["success"]({
        duration: 3,
        description: "Size Updated"
      });
    }

    if (isUpdateSizesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [dispatch, errorMessage, isUpdateSizesFailure, isUpdateSizesSuccess, prevUpdateSize, sizesArr, updatedSize])

  const onSelectColor = (value, obj) => {
    form.setFieldValue("size", obj.label)
  }

  const onFinish = (obj) => {
    dispatch(updateSizesRequest({ id: obj.id, data: { size: obj.size }}))
  }

  return <Form
    style={{border: "1px solid grey", padding: "60px", borderRadius: "10px"}}
    onFinish={onFinish}
  >
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Edit Size</Title>
    <Form.Item
      name="id"
      label="Select Size for Edit"
    >
        <Select
          style={{ width: 120 }}
          onChange={onSelectColor}
          options={sizesArr.map((size) => ({ label: size.size, value: size.id}))}
        />
    </Form.Item>
    {sizeField ? <Form.Item
      name="size"
      label="Type Size"
      hasFeedback
      shouldUpdate={true}
      initialValue={sizeField}
      rules={[{ required: true, message: 'Please Type Size' }]}
    >
      <Input disabled={!sizeField} type="text" onChange={(e) => form.setFieldValue("size", e.target.value)}/>
    </Form.Item> : null}

    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
        <Button loading={false} disabled={!sizeField} type="primary" htmlType="submit">
          Edit
        </Button>
    </Form.Item>
  </Form>
}