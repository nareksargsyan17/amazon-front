import {Content} from "antd/es/layout/layout";
import {Button, Form, Input, InputNumber, notification, Select, Space, Switch, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Upload from "antd/es/upload/Upload";
import {DownOutlined, UploadOutlined} from "@ant-design/icons";
import {postProductRequest, uploadProductRequest} from "../redux/products/actions";
import {useEffect, useState} from "react";
import {usePrevious} from "../usePrevious/usePrevious";
import Tree from "antd/es/tree/Tree";
import {getColorsRequest} from "../redux/colors/actions";
import {getSizesRequest} from "../redux/sizes/actions";
const {Option} = Select;
const {Title} = Typography

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};



export default function ProductAdd() {
  const { isPostProductSuccess, isUploadProductRequest, isUploadProductSuccess, product} = useSelector(state => state.products);
  const { categories } = useSelector(state => state.categories);
  const { colors } = useSelector(state => state.colors);
  const { sizes } = useSelector(state => state.sizes);
  const dispatch = useDispatch();
  const prevPostSuccess = usePrevious(isPostProductSuccess);
  const prevUploadSuccess = usePrevious(isUploadProductSuccess);
  const [images, setImages] = useState({main: [], gallery: []});
  const [category, setCategory] = useState(0);
  
  
  useEffect(() => {
    dispatch(getColorsRequest());
    dispatch(getSizesRequest());
  }, [dispatch])
  
  useEffect(() => {
    if (prevPostSuccess === false && isPostProductSuccess) {
      const formData = new FormData();
      images.gallery.forEach((image) => {
        formData.append("gallery", image.originFileObj);
      })
      formData.append("main", images.main[0].originFileObj);
      console.log('formData', formData)
      dispatch(uploadProductRequest({formData, id: product.id}))
    }
  }, [dispatch, images, isPostProductSuccess, prevPostSuccess, product])


  useEffect(() => {
    if (prevUploadSuccess === false && isUploadProductSuccess) {
      notification["success"]({
        duration: 3,
        description: "Product Created"
      });
    }
  })

  const normFile = (e, name) => {
    const newImages = {...images}
    if (name === "main") {
      const main = e.fileList;
      newImages.main = main;
      setImages(newImages);
    } else {
      const gallery = e.fileList;
      newImages.gallery = gallery;
      setImages(newImages);
    }
  };

  const onFinish = (values) => {
    console.log(values)
    const {main, gallery, ...data} = values;
    data.categoryId = category;
    dispatch(postProductRequest(data));
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
          rules={[{ required: true, message: 'Please Type your Product Category!' }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          hasFeedback={category === 0}
          rules={[{ required: (category === 0), message: 'Please Type your Product Category!' }]}
        >
          <Tree
            showLine
            switcherIcon={<DownOutlined/>}
            onSelect={(key) => {
              setCategory(key[0])
            }}
            treeData={categories}
          />
        </Form.Item>
        <Form.Item
          name="colors"
          label="Select Colors"
          rules={[{ required: true, message: 'Please select your Product colors!', type: 'array' }]}
        >
          <Select mode="multiple" placeholder="Please select Product colors">
            {colors.map(color => <Option key={color.id} value={color.id}>{color.color}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="sizes"
          label="Select Sizes"
          rules={[{ required: true, message: 'Please select your Product Sizes!', type: "array" }]}
        >
          <Select mode="multiple" placeholder="Please select Product colors">
            {sizes.map(size =>  <Option key={size.id} value={size.id}>{size.size}</Option>)})}
          </Select>
        </Form.Item>
        <Form.Item
          name="main"
          label="Main Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => normFile(e, "main")}
        >
          <Upload name="logo" maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="gallery"
          label="Gallery Images"
          valuePropName="fileList"
          getValueFromEvent={(e) => normFile(e, "gallery")}
        >
          <Upload name="logo" maxCount={4} listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="isPublished" label="Switch" valuePropName="checked">
          <Switch checked={true}/>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button loading={isUploadProductRequest} type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Content>
  )
}