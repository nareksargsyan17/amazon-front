import {Button, Drawer} from "antd";
import {useEffect, useState} from "react";
import {DownOutlined, UnorderedListOutlined} from "@ant-design/icons";
import Tree from "antd/es/tree/Tree";
import {useDispatch, useSelector} from "react-redux"
import {getCategoriesRequest} from "../../redux/categories/actions";
import {getProductsRequest} from "../../redux/products/actions";


export function DrawerCategory() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { filterState } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, [dispatch])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSelect = async (key) => {
    try {
      const id = key[0];
      if (id) {
        dispatch(getProductsRequest({...filterState, id: id}));
      }
    } catch (error) {
      return {
        message: "Something is wrong"
      }
    }
  };

  return (
    <>
      <Button type="default" onClick={showDrawer}>
        <UnorderedListOutlined/>
      </Button>
      <Drawer title="Select Categories" placement="left" onClose={onClose} open={open}>
        <Tree
          showLine
          switcherIcon={<DownOutlined/>}
          onSelect={onSelect}
          treeData={categories}
        />
      </Drawer>
    </>
  );
}