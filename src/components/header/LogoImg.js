import { Image } from "antd";
import { useNavigate } from "react-router-dom";

export default function LogoImg() {
  const navigate = useNavigate();
  const onRouteHome = () => {
    navigate("/");
  };

  return <Image src="logo.png" preview={false} width={50} style={{cursor: "pointer"}} onClick={onRouteHome}/>
}