import {Button, Form, Input, notification, Space, Typography} from "antd";
import Tree from "antd/es/tree/Tree";
import {DownOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCategoriesRequest, updateCategoriesRequest} from "../../../redux/categories/actions";
const { Title } = Typography;

export default function CategoryEdit() {
  const { categories, isUpdateCategoriesSuccess, isUpdateCategoriesFailure, errorMessage } = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [parentCategory, setParentCategory] = useState();
  const [form] = Form.useForm();

  const name = Form.useWatch('name', { form, preserve: true });

  const onFinish = (values) => {
    if (!parentCategory) {
      delete values.parentId;
    } else {
      values.parentId = parentCategory
    }
    dispatch(updateCategoriesRequest({id: category, data: values}));
  }

  useEffect(() => {
    if (isUpdateCategoriesSuccess) {
      dispatch(getCategoriesRequest())
      notification["success"]({
        duration: 3,
        description: "Category Updated"
      });
    }

    if (isUpdateCategoriesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [dispatch, errorMessage, isUpdateCategoriesFailure, isUpdateCategoriesSuccess])

  return <>
    <Space direction="vertical" style={{ border: "1px solid grey", padding: "60px", borderRadius: "10px", width: "100%"}}>
      <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Edit Category</Title>
          <Space wrap>
            <Title level={5}>Select Category for change</Title>
            <Tree
              showLine
              switcherIcon={<DownOutlined/>}
              onSelect={(key, title) => {
                setCategory(key[0]);
                form.setFieldValue("name", title.node.title)
              }}
              treeData={categories}
            /></Space>
      {category ? <Form
        onFinish={onFinish}
      >
        <Title level={5}>Edit Category Name and Parent Category</Title>
        <Form.Item
          name="name"
          label="Category"
          shouldUpdate={true}
          initialValue={name}
        >
          <Input onChange={(e) => form.setFieldValue("name", e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="parentId"
          label="Parent Category"
        >
          <Tree
            showLine
            switcherIcon={<DownOutlined/>}
            onSelect={(key) => {
              setParentCategory(key[0]);
            }}
            treeData={categories}
            disabled={!category}

          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
          <Space>
            <Button loading={false} type="primary" htmlType="submit">
              Edit
            </Button>
          </Space>
        </Form.Item>
      </Form>
      : null}

    </Space>

  </>
}