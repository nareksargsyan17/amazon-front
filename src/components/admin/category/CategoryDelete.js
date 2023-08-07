import {Button, notification, Popconfirm, Space, Typography} from "antd";
import Tree from "antd/es/tree/Tree";
import {DownOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteCategoriesRequest, getCategoriesRequest} from "../../../redux/categories/actions";

const {Title} = Typography;

export default function CategoryDelete() {
  const {
    categories,
    isDeleteCategoriesSuccess,
    isDeleteCategoriesFailure,
    errorMessage
  } = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState();


  useEffect(() => {
    if (isDeleteCategoriesSuccess) {
      dispatch(getCategoriesRequest())
      setCategory(undefined)
      notification["success"]({
        duration: 3,
        description: "Category Deleted"
      });
    }

    if (isDeleteCategoriesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [dispatch, errorMessage, isDeleteCategoriesFailure, isDeleteCategoriesSuccess])


  return <Space direction="vertical"
         style={{border: "1px solid grey", padding: "60px", borderRadius: "10px", textAlign: "center"}}>
    <Title level={4} style={{textAlign: "center", marginBottom: "15px"}}>Delete Category</Title>
    <Space wrap>
      <Title level={5}>Select Category for delete</Title>
      <Tree
        showLine
        switcherIcon={<DownOutlined/>}
        onSelect={(key) => {
          setCategory(key[0]);
        }}
        treeData={categories}
      />
    </Space>
    <Popconfirm
      disabled={category === undefined}
      title="Delete Category"
      description="Are you sure to delete this category?"
      icon={
        <QuestionCircleOutlined
          style={{
            color: 'red',
          }}
        />
      }
      onConfirm={() => dispatch(deleteCategoriesRequest(category))}
    >
      <Button danger disabled={category === undefined}>Delete</Button>
    </Popconfirm>
  </Space>
}