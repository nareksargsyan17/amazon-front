import {Layout, Typography, Radio, Empty, Skeleton, notification, Button, Popconfirm, Space, Form, Input} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  changeAddressRequest,
  checkAddressIsMain,
  deleteAddressRequest,
  getAddressesRequest
} from "../redux/addresses/actions";
import {usePrevious} from "../usePrevious/usePrevious";
import "../App.css";
import {CloseOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import {postRegistrationRequest} from "../redux/auth/actions";
const { Content } = Layout;
const {Title} = Typography

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8
    },
  },
};

export default function Addresses() {
  const [form] = Form.useForm();
  const {
    addresses, 
    isGetAddressesSuccess, 
    isMainId, 
    isGetAddressesRequest, 
    isChangeAddressSuccess, 
    isChangeAddressRequest,
    isDeleteAddressSuccess
  } = useSelector(state => state.addresses);
  const dispatch = useDispatch();
  const prevChangedSuccess = usePrevious(isChangeAddressSuccess);
  const prevGetSuccess = usePrevious(isGetAddressesSuccess);
  const prevDeleteSuccess = usePrevious(isDeleteAddressSuccess);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      dispatch(getAddressesRequest(localStorage.getItem("token")))
  }, [dispatch])

  useEffect(() => {
    if (isGetAddressesSuccess && prevGetSuccess === false && addresses.length > 0) {
      let address = addresses.find(address => address.isMain)
      dispatch(checkAddressIsMain(address.id))
    }
  }, [addresses, dispatch, isGetAddressesSuccess, prevGetSuccess]);

  useEffect(() => {
    if (isChangeAddressSuccess && prevChangedSuccess === false) {
      notification["success"]({
        duration: 3,
        description: "Your main address chosen"
      });
      dispatch(getAddressesRequest(localStorage.getItem("token")))
    }
    
    if (isDeleteAddressSuccess && prevDeleteSuccess === false) {
      notification["success"]({
        duration: 3,
        description: "Address was deleted"
      });
      dispatch(getAddressesRequest(localStorage.getItem("token")))
    }
  }, [dispatch, isChangeAddressSuccess, isDeleteAddressSuccess, isMainId, prevChangedSuccess, prevDeleteSuccess])
  
  const onChange = (e) => {
    dispatch(changeAddressRequest({id: e.target.value, token: localStorage.getItem("token")}))
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(values)
  };
  return (
      <Content style={{margin: "0 50px", padding: "30px", backgroundColor: "white"}}>
         <Space direction="horizontal" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
           <Title>My Addresses</Title>
           <Modal title="Add Address" style={{display: "flex", justifyContent: "center"}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
             <Form
               form={form}
               name="register"
               onFinish={onFinish}
               style={{
                 textAlign: "center",
                 width: "400px",
                 background: "transparent",
                 padding: "40px 0 40px 0",
               }}
               scrollToFirstError
             >
               <Form.Item
                 name="address"
                 rules={[
                   {
                     required: true,
                     message: 'Please input your Address!',
                     whitespace: true,
                   },
                 ]}
               >
                 <Input placeholder="Address"/>
               </Form.Item>
             </Form>
           </Modal>
           <Button type="primary" onClick={showModal}><PlusOutlined /></Button>
         </Space>
        <Skeleton active loading={isGetAddressesRequest || isChangeAddressRequest}>
          <Radio.Group onChange={onChange} value={isMainId}  style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            {
              addresses?.length > 0 ? (
                addresses.map(address =>  <Radio className="address-radio" value={address.id}  key={address.id} style={{padding: "20px 10px", margin: "0", boxShadow: '1px 2px 8px -3px rgba(0,0,0,0.75)', fontSize: "16px"}}>
                  <span>{address.address}</span>
                  <Popconfirm
                  title="Delete Address from Address List"
                  description="Are you sure to delete this Address?"
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: 'red',
                      }}
                    />
                  }
                  onConfirm={
                    () => {
                      dispatch(deleteAddressRequest({id: address.id, token: localStorage.getItem("token")}))
                    }
                  }
                >
                  <Button danger ><CloseOutlined /></Button>
                  </Popconfirm>
                </Radio>)
              ) : (
                <Empty/>
              )
            }
          </Radio.Group>
        </Skeleton>
      </Content>
  )
}