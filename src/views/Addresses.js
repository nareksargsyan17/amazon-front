import {
  Layout,
  Typography,
  Radio,
  Empty,
  Skeleton,
  notification,
  Button,
  Popconfirm,
  Space,
  Input
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAddressRequest,
  deleteAddressRequest,
  getAddressesRequest,
  postAddressRequest
} from "../redux/addresses/actions";
import { usePrevious } from "../usePrevious/usePrevious";
import "../App.css";
import { CloseOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
const { Content } = Layout;
const { Title } = Typography;

export default function Addresses() {
  const {
    addresses, 
    isGetAddressesSuccess, 
    isMainId, 
    isGetAddressesRequest, 
    isChangeAddressSuccess,
    isDeleteAddressSuccess,
    isPostAddressSuccess,
  } = useSelector(state => state.addresses);
  const dispatch = useDispatch();
  const prevChangedSuccess = usePrevious(isChangeAddressSuccess);
  const prevGetSuccess = usePrevious(isGetAddressesSuccess);
  const prevDeleteSuccess = usePrevious(isDeleteAddressSuccess);
  const prevPostSuccess = usePrevious(isPostAddressSuccess);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressInput, setAddress] = useState("");
  const [addressesArr, setAddresses] = useState([]);
  const [mainId, setMainId] = useState(0);

  useEffect(() => {
      dispatch(getAddressesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isGetAddressesSuccess && prevGetSuccess === false && addresses.length > 0) {
      setAddresses(addresses);
      const address = addresses.find(address => address.isMain);
      if (address) {
        setMainId(address.id);
      }
    }
  }, [addresses, dispatch, isGetAddressesSuccess, prevGetSuccess]);

  useEffect(() => {
    if (isChangeAddressSuccess && prevChangedSuccess === false) {
      notification["success"]({
        duration: 3,
        description: "Your main address chosen"
      });
    }
    
    if (isDeleteAddressSuccess && prevDeleteSuccess === false) {
      notification["success"]({
        duration: 3,
        description: "Address was deleted"
      });
    }
    
    if (isPostAddressSuccess && prevPostSuccess === false) {
      notification["success"]({
        duration: 3,
        description: "Address was Created"
      });
      setAddresses(addresses)
    }
  }, [addresses, addressesArr, dispatch, isChangeAddressSuccess, isDeleteAddressSuccess, isMainId, isPostAddressSuccess, prevChangedSuccess, prevDeleteSuccess, prevPostSuccess]);
  
  const onChange = (e) => {
    dispatch(changeAddressRequest({id: e.target.value, token: localStorage.getItem("token")}))
    const newAddresses = addressesArr.map(address => {
      address.isMain = address.id === e.target.value;
      if (address.isMain) {
        setMainId(address.id)
      }
      return address;
    })
    setAddresses(newAddresses);
  }

  const toggleModal = (isShown) => {
    setIsModalOpen(isShown);
  };
  const handleOk = () => {
    dispatch(postAddressRequest({data: {address : addressInput}, token: localStorage.getItem("token")}));
    setIsModalOpen(false)
  };

  return (
      <Content style={{margin: "0 50px", padding: "30px", backgroundColor: "white"}}>
         <Space direction="horizontal" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
           <Title>My Addresses</Title>
           <Modal title="Add Address" style={{display: "flex", justifyContent: "center"}} open={isModalOpen} onCancel={() => toggleModal(false)}
                  footer={[
                    <Button key="back" onClick={() => toggleModal(false)}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" className="login-form-button" loading={false} onClick={handleOk}>
                      Add
                    </Button>
                  ]}
           >
             <Input style={{minWidth: "400px", margin: "40px 0"}} placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
           </Modal>
           <Button type="primary" onClick={() => toggleModal(true)}><PlusOutlined /></Button>
         </Space>
        <Skeleton active loading={isGetAddressesRequest}>
          <Radio.Group onChange={onChange} value={mainId}  style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            {
              addressesArr?.length > 0 ? (
                addressesArr.map(address => <Radio className="address-radio" value={address.id} key={address.id} style={{
                    padding: "20px 10px",
                    margin: "0",
                    boxShadow: '1px 2px 8px -3px rgba(0,0,0,0.75)',
                    fontSize: "16px"
                  }}>
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
                          dispatch(deleteAddressRequest({id: address.id, token: localStorage.getItem("token")}));
                          const newAddressesArr = addressesArr.filter(element => element.id !== address.id);
                          setAddresses(newAddressesArr);
                        }
                      }
                    >
                      <Button danger><CloseOutlined/></Button>
                    </Popconfirm>
                  </Radio>
                )
              ) : (
                <Empty/>
              )
            }
          </Radio.Group>
        </Skeleton>
      </Content>
  )
}