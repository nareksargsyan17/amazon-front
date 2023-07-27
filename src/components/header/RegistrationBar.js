import {Button, Space} from "antd";
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";


export function RegistrationBar() {
  const navigate = useNavigate();


  const onSignup = () => {
    navigate("/signup");
  };

  const onSignIn = () => {
    navigate("/signin");
  };

  const onSignOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload()
  }

  return localStorage.getItem("token") ? (
    <Space wrap>
      <Button type="text" style={{color: "white"}} onClick={onSignOut}>Sign Out</Button>
    </Space>
    ) : (
    <Space wrap>
      <Button type="text" style={{color: "white"}} onClick={onSignIn}>Sign In</Button>
      <Button type="text" style={{color: "white"}} onClick={onSignup}>Sign Up</Button>
    </Space>
  )
}