import {Layout, Space, Typography} from "antd";
import CategoryAdd from "../components/admin/category/CategoryAdd";
import CategoryEdit from "../components/admin/category/CaregoryEdit";
import CategoryDelete from "../components/admin/category/CategoryDelete";
import ColorAdd from "../components/admin/color/ColorAdd";
import ColorEdit from "../components/admin/color/ColorEdit";
import ColorDelete from "../components/admin/color/ColorDelete";
import SizeAdd from "../components/admin/size/SizeAdd";
import SizeEdit from "../components/admin/size/SizeEdit";
import SizeDelete from "../components/admin/size/SizeDelete";

const { Content } = Layout;
const { Title } = Typography;

export default function AdminPanel() {


  return <Content style={{margin: "0 50px", background: "white", padding: "40px", display: "flex", flexDirection:"column", alignItems: "stretch", justifyContent:"center"}}>
    <Title style={{textAlign: "center"}}>Admin Panel</Title>
    <Space direction="vertical" style={{width: "100%", boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.75)", padding: "40px 0", margin: "50px 0"}}>
      <Title style={{textAlign: "center"}}>Category</Title>
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
    <Space direction="vertical" style={{width: "100%", boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.75)", padding: "40px 0", margin: "50px 0"}}>
      <Title style={{textAlign: "center"}}>Color</Title>
      <Space wrap style={{display: "flex", alignItems: "stretch", justifyContent:"space-around", width: "100%"}}>
        <Space.Compact size="large" style={{height: "100%"}}>
          <ColorAdd/>
        </Space.Compact>
        <Space.Compact size="large" style={{height: "100%"}}>
          <ColorEdit/>
        </Space.Compact>
        <Space.Compact  size="large" style={{height: "100%"}}>
          <ColorDelete/>
        </Space.Compact>
      </Space>
    </Space>

    <Space direction="vertical" style={{width: "100%", boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.75)", padding: "40px 0", margin: "50px 0"}}>
      <Title style={{textAlign: "center"}}>Size</Title>
      <Space wrap style={{display: "flex", alignItems: "stretch", justifyContent:"space-around", width: "100%"}}>
        <Space.Compact size="large" style={{height: "100%"}}>
          <SizeAdd/>
        </Space.Compact>
        <Space.Compact size="large" style={{height: "100%"}}>
          <SizeEdit/>
        </Space.Compact>
        <Space.Compact  size="large" style={{height: "100%"}}>
          <SizeDelete/>
        </Space.Compact>
      </Space>

    </Space>
  </Content>
}