import {Layout, Skeleton, Space, Typography} from "antd";
import CategoryAdd from "../components/admin/category/CategoryAdd";
import CategoryEdit from "../components/admin/category/CaregoryEdit";
import CategoryDelete from "../components/admin/category/CategoryDelete";
import {useEffect} from "react";
import {getUserRequest} from "../redux/auth/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
const { Content } = Layout;
const { Title } = Typography;

export default function CategoryAdmin() {
  const { role, isGetUserSuccess, isGetUserFailure, isGetUserRequest } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  

  return <Skeleton active loading={isGetUserRequest}>
    <Content style={{margin: "0 50px", background: "white", padding: "40px", display: "flex", flexDirection:"column", alignItems: "stretch", justifyContent:"center"}}>
      <Title style={{textAlign: "left"}}>Category CRUD</Title>
      <Space direction="vertical" style={{width: "100%", boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.75)", padding: "40px 0", margin: "50px 0"}}>
        <Space wrap style={{display: "flex", alignItems: "stretch", justifyContent:"space-around", width: "100%"}}>
          <Space.Compact size="large" style={{height: "100%"}}>
            <CategoryAdd/>
          </Space.Compact>
          <Space.Compact size="large" style={{height: "100%"}}>
            <CategoryEdit/>
          </Space.Compact>
          <Space.Compact  size="large" style={{height: "100%"}}>
            <CategoryDelete/>
          </Space.Compact>
        </Space>
      </Space>

    </Content>
  </Skeleton>
}