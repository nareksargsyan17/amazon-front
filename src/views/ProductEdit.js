import {Content} from "antd/es/layout/layout";
import {Button, Form, Input, InputNumber, notification, Select, Skeleton, Space, Switch, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Upload from "antd/es/upload/Upload";
import {DownOutlined, UploadOutlined} from "@ant-design/icons";
import {
  getProductRequest,
  getProductsRequest,
  postProductRequest, updateProductRequest,
  uploadProductRequest
} from "../redux/products/actions";
import {useEffect, useState} from "react";
import {usePrevious} from "../usePrevious/usePrevious";
import Tree from "antd/es/tree/Tree";
import {getColorsRequest} from "../redux/colors/actions";
import {getSizesRequest} from "../redux/sizes/actions";
import {useParams} from "react-router-dom";
const {Option} = Select;
const {Title} = Typography

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function  ProductEdit() {
  const { isUpdateProductSuccess, isUploadProductRequest, isUploadProductSuccess, product,
    isGetProductSuccess} = useSelector(state => state.products);

  const { categories } = useSelector(state => state.categories);
  const { colors } = useSelector(state => state.colors);
  const { sizes } = useSelector(state => state.sizes);
  const dispatch = useDispatch();
  const prevUpdateSuccess = usePrevious(isUpdateProductSuccess);
  const prevUploadSuccess = usePrevious(isUploadProductSuccess);
  const prevGetSuccess = usePrevious(isGetProductSuccess);
  const [images, setImages] = useState({main: [], gallery: []});
  const [category, setCategory] = useState(0);
  const [defaultImages, setImagesDefault] = useState({main: [], gallery: []});
  const { productId } = useParams();




  useEffect(() => {
    dispatch(getColorsRequest());
    dispatch(getSizesRequest());
    dispatch(getProductRequest({productId}))
  }, [dispatch, productId])


  useEffect(() => {
    if (isGetProductSuccess && prevGetSuccess === false) {
      console.log(product)
      const defImages = {...defaultImages}
      product.images.forEach(image => {
        console.log(image)
        if (image.isMain) {
          defImages.main.push({uid: image.id, url: `http://localhost:3001/${image.path}`})
        } else {
          defImages.gallery.push({uid: image.id, url: `http://localhost:3001/${image.path}`})
        }
      })
      setImagesDefault(defImages);

    }
  }, [defaultImages, isGetProductSuccess, prevGetSuccess, product]);

  useEffect(() => {
    console.log(images, defaultImages)
    if (prevUpdateSuccess === false && isUpdateProductSuccess) {
      const formData = new FormData();
      console.log(images)
      // images.gallery.forEach((image) => {
      //   formData.append("gallery", image.originFileObj);
      // })
      // formData.append("main", images.main[0].originFileObj);
      // console.log('formData', formData)
      // dispatch(uploadProductRequest({formData, id: product.id}))
    }
  }, [dispatch, images, isUpdateProductSuccess, prevUpdateSuccess])


  useEffect(() => {
    if (prevUploadSuccess === false && isUploadProductSuccess) {
      notification["success"]({
        duration: 3,
        description: "Product Created"
      });
    }
  })

  const normFile = (e, name) => {
    const formData = new FormData();
    console.log(e, product)
    if (name === "main") {
      formData.append("main", e.file.originFileObj)
    } else {
      formData.append("gallery", e.file.originFileObj)
    }
    dispatch(uploadProductRequest({formData, id: product.id}))
  };

  const onFinish = (values) => {
    console.log(values)
    const {main, gallery, ...data} = values;
    data.categoryId = category;
    dispatch(updateProductRequest({data, id: product.id}));
  }

  return (
    <Content style={{margin: "0 50px", padding: "30px", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Skeleton active loading={!(isGetProductSuccess && product?.id)}>
        <Title>Edit Product</Title>
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
            rules={[{ required: false, message: 'Please Type your Product name!' }]}
          >
            <Input placeholder="Product Name" defaultValue={product.name}/>
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            hasFeedback
            rules={[{ required: false, message: 'Please Type your Product Brand!' }]}
          >
            <Input placeholder="Brand" defaultValue={product.brand}/>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            hasFeedback
            rules={[{ required: false, message: 'Please Type your Product Price!' }]}
          >
            <InputNumber min={0} defaultValue={product.price}/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            hasFeedback
            rules={[{ required: false, message: 'Please Type your Product Category!' }]}
          >
            <Input.TextArea showCount maxLength={100} defaultValue={product.description}/>
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            hasFeedback={category === 0}
            rules={[{ required: false, message: 'Please Type your Product Category!' }]}
          >
            <Tree
              showLine
              switcherIcon={<DownOutlined/>}
              defaultSelectedKeys={[product.categoryId]}
              onSelect={(key) => {
                setCategory(key[0])
              }}
              treeData={categories}
            />
          </Form.Item>
          <Form.Item
            name="colors"
            label="Select Colors"
            rules={[{ required: false, message: 'Please select your Product colors!', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="Please select Product colors" defaultValue={product?.colors?.map(color => color.id)}>
              {colors.map(color => <Option key={color.id} value={color.id}>{color.color}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="sizes"
            label="Select Sizes"
            rules={[{ required: false, message: 'Please select your Product Sizes!', type: "array" }]}
          >
            <Select mode="multiple" placeholder="Please select Product colors" defaultValue={product?.sizes?.map(size => size.id)}>
              {sizes.map(size =>  <Option key={size.id} value={size.id}>{size.size}</Option>)})}
            </Select>
          </Form.Item>
          <Form.Item
            name="main"
            label="Main Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => normFile(e, "main")}
          >
            <Upload name="logo" maxCount={1} listType="picture" defaultFileList={defaultImages.main}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="gallery"
            label="Gallery Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => normFile(e, "gallery")}
          >
            <Upload name="logo" maxCount={4} listType="picture" defaultFileList={defaultImages.gallery}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="isPublished" label="Switch" valuePropName="checked">
            <Switch defaultChecked={product.isPublished}/>
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
      </Skeleton>

    </Content>
  )
}