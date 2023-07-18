import {Button, Space} from "antd";

export function RegistrationBar() {
  return (
    <Space wrap>
      <Button type="text" style={{color: "white"}}>Sign In</Button>
      <Button type="text" style={{color: "white"}}>Sign Up</Button>
    </Space>
  )
}