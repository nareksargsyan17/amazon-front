import {Button, Space} from "antd";
import {useNavigate} from 'react-router-dom';


export function RegistrationBar() {
  const navigate = useNavigate();
  const onSignup = () => {
      navigate("/signup");
  }


  return (
    <Space wrap>
      <Button type="text" style={{color: "white"}}>Sign In</Button>
      <Button type="text" style={{color: "white"}} onClick={onSignup}>Sign Up</Button>
    </Space>
  )
}