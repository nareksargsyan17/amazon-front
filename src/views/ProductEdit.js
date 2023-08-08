import {Content} from "antd/es/layout/layout";
import {
  Button,
  ColorPicker,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  Skeleton,
  Space,
  Switch,
  Typography
} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Upload from "antd/es/upload/Upload";
import {DownOutlined, UploadOutlined} from "@ant-design/icons";
import {
  deleteImageRequest,
  getProductRequest,
  updateProductRequest,
  uploadProductRequest
} from "../redux/products/actions";
import {useEffect, useState} from "react";
import {usePrevious} from "../usePrevious/usePrevious";
import Tree from "antd/es/tree/Tree";
import {getColorsRequest} from "../redux/colors/actions";
import {getSizesRequest} from "../redux/sizes/actions";
import {useNavigate, useParams} from "react-router-dom";
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
  const [category, setCategory] = useState(0);
  const [images, setImages] = useState({main: [], gallery: []});
  const [defaultImages, setImagesDefault] = useState({main: [], gallery: []});
  const { productId } = useParams();
  const navigate = useNavigate();




  useEffect(() => {
    dispatch(getColorsRequest());
    dispatch(getSizesRequest());
    dispatch(getProductRequest({productId}))
  }, [dispatch, productId])


  useEffect(() => {
    if (isGetProductSuccess && prevGetSuccess === false) {
      setCategory(product.categoryId);
      const defImages = {...defaultImages}
      product.images.forEach(image => {
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
    if (prevUpdateSuccess === false && isUpdateProductSuccess) {
      const formData = new FormData();
      if (images.main.length > 0) {
        formData.append("main", images.main[0]);
        dispatch(deleteImageRequest(defaultImages.main[0].uid))
      }

      if (images.gallery.length > 0) {
        images.gallery.forEach((image) => {
          console.log(defaultImages)
          formData.append("gallery", image);
        })
      }

      if (images.gallery.length > 0 || images.main.length > 0) {
        dispatch(uploadProductRequest({formData, id: product.id}))
      }

      navigate("/mystore")
    }
  }, [defaultImages, dispatch, images.gallery, images.main, isUpdateProductSuccess, navigate, prevUpdateSuccess, product.id])


  useEffect(() => {
    if (prevUploadSuccess === false && isUploadProductSuccess) {
      notification["success"]({
        duration: 3,
        description: "Product Updated"
      });
    }
  }, [isUploadProductSuccess, prevUploadSuccess])

  const beforeUpload = (file, name) => {
    const newImages = {...images}
    if (name === "main") {
      newImages.main.push(file)
    } else {
      newImages.gallery.push(file)
    }
    setImages(newImages);

    return false;
  };

  const onFinish = (values) => {
    const {main, gallery, ...data} = values;
    data.categoryId = category;
    dispatch(updateProductRequest({data, id: product.id}));
  }

  const onRemoveImage = (e) => {
    dispatch(deleteImageRequest(e.uid))
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
          initialValues={{
            name: product.name,
            brand: product.brand,
            price: product.price,
            description: product.description,
            colors: product?.colors?.map(color => color.id),
            sizes: product?.sizes?.map(size => size.id)
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            hasFeedback
            rules={[{ required: false, message: 'Please Type your Product name!' }]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            hasFeedback
            rules={[{ required: false, message: 'Please Type your Product Brand!' }]}
          >
            <Input placeholder="Brand"/>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            hasFeedback
            rules={[{ required: false, message: 'Please Type your Product Price!' }]}
          >
            <InputNumber min={0}/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            hasFeedback
            rules={[{ required: false, message: 'Please Type your Product Category!' }]}
          >
            <Input.TextArea showCount maxLength={100}/>
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
            <Select mode="multiple" placeholder="Please select Product colors">
              {colors.map(color => <Option key={color.id} value={color.id}><ColorPicker size="small" value={color.color} disabled={true}/> {color.color}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="sizes"
            label="Select Sizes"
            rules={[{ required: false, message: 'Please select your Product Sizes!', type: "array" }]}
          >
            <Select mode="multiple" placeholder="Please select Product colors">
              {sizes.map(size =>  <Option key={size.id} value={size.id}>{size.size}</Option>)})}
            </Select>
          </Form.Item>
          <Form.Item
            name="main"
            label="Main Image"
            valuePropName="main"
          >
            <Upload name="logo" maxCount={1} listType="picture" defaultFileList={defaultImages.main} onRemove={onRemoveImage} beforeUpload={(e) => beforeUpload(e, "main")}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="gallery"
            label="Gallery Images"
            valuePropName="gallery"
          >
            <Upload name="logo" maxCount={4} listType="picture" defaultFileList={defaultImages.gallery} onRemove={onRemoveImage} multiple={true} beforeUpload={(e) => beforeUpload(e, "gallery")}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="isPublished" label="isPublished" valuePropName="checked">
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