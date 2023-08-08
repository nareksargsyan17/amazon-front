import {Button, ColorPicker, Input, notification, Popconfirm, Skeleton, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, QuestionCircleOutlined, SaveOutlined} from "@ant-design/icons";
import {changeColor, deleteColorsRequest, postColorsRequest} from "../redux/colors/actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {usePrevious} from "../usePrevious/usePrevious";
import {
  changeSize,
  deleteSizesRequest,
  getSizesRequest,
  postSizesRequest,
  updateSizesRequest
} from "../redux/sizes/actions";
import {Content} from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
import Modal from "antd/es/modal/Modal";

export default function SizeAdmin() {
  const {
    errorMessage,
    isUpdateSizesSuccess,
    isUpdateSizesFailure,
    isGetSizesRequest,
    sizes,
    isGetSizesSuccess,
    isDeleteSizesSuccess,
    deletedSizeId,
    isDeleteSizesFailure,
    createdSize,
    isPostSizesSuccess,
    isPostSizesFailure,
    updatedSize } = useSelector(state => state.sizes);

  const dispatch = useDispatch();
  const [sizesArr, setSizesArr] = useState([]);
  const [defSize, setSize] = useState(createdSize)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevDeleteSizeSuccess = usePrevious(isDeleteSizesSuccess);
  const prevUpdateSize = usePrevious(isUpdateSizesSuccess);
  const prevPostSizeSuccess = usePrevious(isPostSizesSuccess);

  useEffect(() => {
    dispatch(getSizesRequest());
  }, [dispatch])

  useEffect(() => {
    if (isGetSizesSuccess) {
      const newSizeArr = sizes.map((size) => ({
        ...size,
        isActive: false
      }))
      setSizesArr(newSizeArr);
    }
  }, [isGetSizesSuccess, sizes])

  useEffect(() => {
    if (isPostSizesSuccess && prevPostSizeSuccess === false) {
      console.log(createdSize)
      setSizesArr([...sizesArr, createdSize])
      notification["success"]({
        duration: 3,
        description: "Size Created"
      });
    }

    if (isPostSizesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [createdSize, dispatch, errorMessage, isPostSizesFailure, isPostSizesSuccess, prevPostSizeSuccess, sizesArr])
  
  useEffect(() => {
    if (isUpdateSizesSuccess && prevUpdateSize === false) {
      const newArr = sizesArr.map(elem => {
        if (elem.id === updatedSize.id) {
          return updatedSize
        } else {
          return elem
        }
      })
      setSizesArr(newArr);
      notification["success"]({
        duration: 3,
        description: "Size Updated"
      });
    }

    if (isUpdateSizesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [dispatch, errorMessage, isUpdateSizesFailure, isUpdateSizesSuccess, prevUpdateSize, sizesArr, updatedSize])


  useEffect(() => {
    if (isDeleteSizesSuccess && prevDeleteSizeSuccess === false) {
      const newArr = sizesArr.filter((elem) => elem.id !== deletedSizeId);
      setSizesArr(newArr);
      notification["success"]({
        duration: 3,
        description: "Size Deleted"
      });
    }
    if (isDeleteSizesFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [deletedSizeId, dispatch, errorMessage, isDeleteSizesFailure, isDeleteSizesSuccess, prevDeleteSizeSuccess, sizesArr])

  const onEdit = (gateSize) => {
    const newSizeArr = sizesArr.map(size => ({
      ...size,
      isActive: size.id === gateSize.id ? !size.isActive : size.isActive
    }))
    if (gateSize.isActive) {
      dispatch(updateSizesRequest({data: {size: gateSize.size}, id: gateSize.id}))
    }
    setSizesArr(newSizeArr);
  }

  const columns = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Action',
      dataIndex: 'x',
      key: 'x',
    },
  ];

  const data = sizesArr.map(size => ({
    key: size.id,
    size: <Input
      type="text"
      bordered={!!size.isActive}
      style={{color: "black"}}
      defaultValue={size.size}
      disabled={!size.isActive}
      onChange={(e) => size.size = e.target.value}/>,
    x: <>
      <Button onClick={() => {onEdit(size)}} type="default">{
        size.isActive ? <SaveOutlined style={{color: "#5FCF48", fontSize: "20px"}}/> : <EditOutlined style={{color: "#FFE016", fontSize: "20px"}}/>
      }</Button>
      <Popconfirm
        title="Delete Color"
        description="Are you sure to delete this Color?"
        icon={
          <QuestionCircleOutlined
            style={{
              color: 'red',
            }}
          />
        }
        onConfirm={() => dispatch(deleteSizesRequest(size.id))}
      >
        <Button danger loading={false}>
          <DeleteOutlined style={{color: "red", fontSize: "20px"}}/>
        </Button>
      </Popconfirm>
    </>
  }))

  return <Content style={{padding: "0 50px"}}>
    <Title style={{textAlign: "left", margin: "60px 0",}}>Size CRUD</Title>
    <Space wrap style={{width: "100%", display:"flex", justifyContent:"end"}}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>+ Add Size</Button>
      <>
        <Modal title="Add new Size"
               open={isModalOpen}
               onOk={() => {
                 console.log(defSize)
                 dispatch(postSizesRequest({size: defSize}))
                 setIsModalOpen(false);
               }}
               onCancel={() => setIsModalOpen(false)}
               okText="Add"
        >
          <Content style={{
            width: "400px",
            display: "flex",
            justifyContent: "center",
            padding: "40px"
          }}>
            <Input type="text" placeholder="Type new Size" required={true} onChange={(e) => setSize(e.target.value)}/>
          </Content>
        </Modal>
      </>
    </Space>
    <Skeleton active loading={isGetSizesRequest}>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Skeleton>
  </Content>
}