import {Button, Drawer} from "antd";
import {useEffect, useState} from "react";
import {DownOutlined, UnorderedListOutlined} from "@ant-design/icons";
import Tree from "antd/es/tree/Tree";
import { useDispatch } from "react-redux"
import {getProductsRequest} from "../../redux/products/actions";


export function DrawerCategory() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");

  useEffect(() => {
        fetch("http://localhost:3001/api/guest/categories/get_all")
        .then(data => data.json())
        .then(data => setOption(data))
  }, [])

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
        dispatch(getProductsRequest("",1));
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
          treeData={option}
        />
      </Drawer>
    </>
  );
}