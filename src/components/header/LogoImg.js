import { Image } from "antd";
import { useNavigate } from "react-router-dom";

export default function LogoImg() {
  const navigate = useNavigate();
  const onRouteHome = () => {
    navigate("/");
  };

  return <Image src="http://localhost:3000/logo.png" preview={false} width={50} style={{cursor: "pointer"}} onClick={onRouteHome}/>
}