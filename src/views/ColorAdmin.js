import {Table, Layout, ColorPicker, Button, Skeleton, notification, Popconfirm, Space} from "antd";
import Title from "antd/es/typography/Title";
import {DeleteOutlined, EditOutlined, QuestionCircleOutlined, SaveOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteColorsRequest,
  getColorsRequest,
  postColorsRequest,
  updateColorsRequest
} from "../redux/colors/actions";
import {usePrevious} from "../usePrevious/usePrevious";
import Modal from "antd/es/modal/Modal";
import {useNavigate} from "react-router-dom";
import {getUserRequest} from "../redux/auth/actions";
const { Content } = Layout;

export default function ColorAdmin() {
  const { role, isGetUserSuccess, isGetUserFailure, isGetUserRequest } = useSelector(state => state.auth);
  const {
    isGetColorsSuccess,
    isGetColorsRequest,
    isPostColorsSuccess,
    isPostColorsFailure,
    isDeleteColorsSuccess,
    isUpdateColorsSuccess,
    isDeleteColorsFailure,
    isDeleteColorsRequest,
    isUpdateColorsFailure,
    deletedColorId,
    errorMessage,
    colors,
    createdColor,
    changedColor } = useSelector(state => state.colors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defColor, setDefColor] = useState("transparent");
  const [colorsArr, setColorsArr] = useState([]);
  const prevUpdateColor = usePrevious(isUpdateColorsSuccess);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevCreateColorSuccess = usePrevious(isPostColorsSuccess);
  const prevDeleteColorSuccess = usePrevious(isDeleteColorsSuccess);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserRequest());
    } else {
      navigate("/notfound");
    }
  }, [dispatch, navigate])

  useEffect(() => {
    if (isGetUserSuccess) {
      if (!role) {
        navigate("/notfound");
      }
    }
    if (isGetUserFailure) {
      navigate("/notfound");
    }
  }, [isGetUserFailure, isGetUserSuccess, navigate, role])

  useEffect(() => {
    dispatch(getColorsRequest())
  }, [dispatch])

  useEffect(() => {
    if (isGetColorsSuccess) {
      const newColorArr = colors.map((color) => ({
        ...color,
        isActive: false
      }))
      setColorsArr(newColorArr);
    }
  }, [colors, isGetColorsSuccess])

  useEffect(() => {
    if (isPostColorsSuccess && prevCreateColorSuccess === false) {
      setColorsArr([...colorsArr, createdColor])
      notification["success"]({
        duration: 3,
        description: "Color Created"
      });
    }

    if (isPostColorsFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [colorsArr, createdColor, dispatch, errorMessage, isPostColorsFailure, isPostColorsSuccess, prevCreateColorSuccess])

  useEffect(() => {
    if (isUpdateColorsSuccess && prevUpdateColor === false) {
      const newArr = colors.map(elem => {
        if (elem.id === changedColor.id) {
          return changedColor
        } else {
          return elem
        }
      })
      setColorsArr(newArr);
      notification["success"]({
        duration: 3,
        description: "Color Updated"
      });
    }

    if (isUpdateColorsFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [changedColor, colors, dispatch, errorMessage, isUpdateColorsFailure, isUpdateColorsSuccess, prevUpdateColor])

  useEffect(() => {
    if (isDeleteColorsSuccess && prevDeleteColorSuccess === false) {
      const newArr = colorsArr.filter((elem) => elem.id !== deletedColorId);
      setColorsArr(newArr);
      notification["success"]({
        duration: 3,
        description: "Color Deleted"
      });
    }
    if (isDeleteColorsFailure) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [colorsArr, deletedColorId, dispatch, errorMessage, isDeleteColorsFailure, isDeleteColorsSuccess, prevDeleteColorSuccess])

  const onEdit = (gateColor) => {
    const neColorArr = colorsArr.map((color) => ({
      ...color,
      isActive: color.id === gateColor.id ? !color.isActive : color.isActive
    }))
    if (gateColor.isActive) {
      dispatch(updateColorsRequest({data: {color : gateColor.color}, id: gateColor.id }))
    }
    setColorsArr(neColorArr)
  }

  const columns = [
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Action',
      dataIndex: 'x',
      key: 'x',
    },
  ];

  const data = colorsArr.map(color => ({
      key: color.id,
      color: <ColorPicker disabled={!color.isActive} defaultValue={color.color} onChangeComplete={(value) => color.color = value.toHexString()} showText/>,
      x: <>
      <Button onClick={() => {onEdit(color)}} type="default">{
        color.isActive ? <SaveOutlined style={{color: "#5FCF48", fontSize: "20px"}}/> : <EditOutlined style={{color: "#FFE016", fontSize: "20px"}}/>
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
          onConfirm={() => dispatch(deleteColorsRequest(color.id))}
        >
          <Button danger loading={isDeleteColorsRequest}>
            <DeleteOutlined style={{color: "red", fontSize: "20px"}}/>
          </Button>
        </Popconfirm>
    </>
    }))

  return <Skeleton active loading={isGetUserRequest}>
    <Content style={{padding: "0 50px"}}>
      <Title style={{textAlign: "left", margin: "60px 0",}}>Color CRUD</Title>
      <Space wrap style={{width: "100%", display:"flex", justifyContent:"end"}}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>+ Add Color</Button>
        <>
          <Modal title="Choose Color"
                 open={isModalOpen}
                 onOk={() => {
                   dispatch(postColorsRequest({color: defColor}))
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
              <ColorPicker onChangeComplete={(value) => setDefColor(value.toHexString())} showText/>
            </Content>
          </Modal>
        </>
      </Space>
      <Skeleton active loading={isGetColorsRequest}>
        <Table
          columns={columns}
          dataSource={data}
        />
      </Skeleton>
    </Content>
  </Skeleton>
}