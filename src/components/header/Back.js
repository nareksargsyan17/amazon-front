import { Button, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Back() {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  }

  return <Space style={{backgroundColor: "white", margin: "0 50px 10px 50px", padding: "20px 20px"}}>
    <Button type="default" onClick={onBack}>
      <LeftOutlined />
      Back
    </Button>
  </Space>
}