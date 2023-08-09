import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

   return <Result
     style={{height: "90vh"}}
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => navigate("/") }>Back Home</Button>}
  />
}