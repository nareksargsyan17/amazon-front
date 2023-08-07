import {Button, Form, Input, notification, Space, Typography} from "antd";
import Tree from "antd/es/tree/Tree";
import {DownOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCategoriesRequest, postCategoriesRequest} from "../../../redux/categories/actions";
const { Title } = Typography;

export default function CategoryAdd() {
  const { categories, isPostCategoriesSuccess, isPostCategoriesFailure, errorMessage} = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (isPostCategoriesSuccess) {
      dispatch(getCategoriesRequest())
      notification["success"]({
        duration: 3,
        description: "Category Created"
      });
    }

    if (isPostCategoriesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [dispatch, errorMessage, isPostCategoriesFailure, isPostCategoriesSuccess])

  const onFinish = (values) => {
    if (!category) {
      values.parentId = null
    } else {
      values.parentId = category
    }

    dispatch(postCategoriesRequest(values))
  }


  return <Form style={{border: "1px solid grey", padding: "60px", borderRadius: "10px"}}
               onFinish={onFinish}
  >
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Add new Category</Title>
    <Form.Item
      name="name"
      label="Category"
      hasFeedback
      rules={[{ required: true, message: 'Please Type Category Name' }]}
    >
      <Input type="text"/>
    </Form.Item>
    <Form.Item
      name="parentId"
      label="Parent Category"
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
    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
      <Space>
        <Button loading={false} type="primary" htmlType="submit">
          Add
        </Button>
      </Space>
    </Form.Item>
  </Form>
}