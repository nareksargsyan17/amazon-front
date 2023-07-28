import {Content} from "antd/es/layout/layout";
import {Button, Form, Input, InputNumber, Select, Space, Switch, Typography, Radio} from "antd";
import {useDispatch} from "react-redux";
import {postProductRequest} from "../redux/products/actions";
import Upload from "antd/es/upload/Upload";
import {UploadOutlined} from "@ant-design/icons";
const {Option} = Select;
const {Title} = Typography

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ProductAdd() {

  const dispatch = useDispatch();


  const onFinish = (values) => {
    console.log(values)
    // dispatch(postProductRequest(values))
  }

  return (
    <Content style={{margin: "0 50px", padding: "30px", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Title>Add Product</Title>
      <Form
        name="validate_other"
        onFinish={onFinish}
        {...formItemLayout}
        style={{ minWidth: 800 }}
      >
        <Form.Item
          name="name"
          label="Name"
          hasFeedback
          rules={[{ required: true, message: 'Please Type your Product name!' }]}
        >
          <Input placeholder="Product Name"/>
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          hasFeedback
          rules={[{ required: true, message: 'Please Type your Product Brand!' }]}
        >
          <Input placeholder="Brand"/>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          hasFeedback
          rules={[{ required: true, message: 'Please Type your Product Price!' }]}
        >
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          hasFeedback
          rules={[{ required: true, message: 'Please Type your Product Description!' }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          hasFeedback
          rules={[{ required: true, message: 'Please Type your Product Category!' }]}
        >
          <Select placeholder="Please select a Category">
            <Option value={1}>China</Option>
            <Option value={2}>U.S.A</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="colors"
          label="Select Colors"
          rules={[{ required: true, message: 'Please select your Product colors!', type: 'array' }]}
        >
          <Select mode="multiple" placeholder="Please select Product colors">
            <Option value={1}>Red</Option>
            <Option value={2}>Green</Option>
            <Option value={3}>Blue</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="sizes"
          label="Select Sizes"
          rules={[{ required: true, message: 'Please select your Product Sizes!', type: "array" }]}
        >
          <Select mode="multiple" placeholder="Please select Product colors">
            <Option value={1}>Red</Option>
            <Option value={2}>Green</Option>
            <Option value={3}>Blue</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="main"
          label="Main Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="isPublished" label="Switch" valuePropName="checked">
          <Switch checked={true}/>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Content>
  )
}