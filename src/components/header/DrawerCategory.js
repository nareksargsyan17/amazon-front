import { Button, Drawer, Empty, notification, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Tree from "antd/es/tree/Tree";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../redux/categories/actions";
import { changeFilterRequest } from "../../redux/products/actions";
import { usePrevious } from "@react-hooks-library/core";
import { useNavigate } from "react-router-dom";


export function DrawerCategory() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    categories,
    isGetCategoriesRequest,
    isGetCategoriesFailure,
    errorMessage
  } = useSelector((state) => state.categories);
  const {filterState} = useSelector((state) => state.products);
  const prevIsGetCategoriesFailure = usePrevious(isGetCategoriesFailure);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isGetCategoriesFailure && prevIsGetCategoriesFailure === false) {
      notification["error"]({
        duration: 7,
        description: errorMessage
      })
    }
  }, [errorMessage, isGetCategoriesFailure, prevIsGetCategoriesFailure]);

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
        dispatch(changeFilterRequest({...filterState, id: id}));
        navigate("/");
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
        <Skeleton active loading={isGetCategoriesRequest}>
          {
            categories.length > 0 ?
              (<Tree
                  showLine
                  switcherIcon={<DownOutlined/>}
                  onSelect={onSelect}
                  treeData={categories}
                />
              ) : (
                <Empty/>
              )
          }
        </Skeleton>
      </Drawer>
    </>
  );
}