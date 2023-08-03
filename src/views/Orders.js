import {Image, Layout, Space, Typography} from "antd";
import Card from "antd/es/card/Card";
import {useNavigate} from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Orders() {
  const navigate =useNavigate();


  return <Content style={{margin: "0 50px", padding: "20px", backgroundColor: "white"}}>
    <Title style={{textAlign: "center"}}>Orders</Title>
    <Space wrap>
      <Card key={1} style={{border: "0.5px solid grey", textAlign: "center"}} className="cart">
        <Space>
          <Image
            width={300}
            src={"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1-1200x800.jpg"}
          />
        </Space>
        <Space direction="vertical" style={{columnGap: 0, textAlign: "left"}}>
          <Title level={4} onClick={() => navigate("/" + 2)}
                 style={{cursor: "pointer"}}>Product: {"lala"}</Title>
          <Text><b>Brand: </b>{"lala"}</Text>
          <Title level={5}>Price: ${"lala"}</Title>
          <Text><b>Category: </b>{"lala"}</Text>
          <Text><b>Size: </b>{"lala"}</Text>
          <Text><b>Color: </b>{"lala"}</Text>
        </Space>
      </Card>
      <Card key={2} style={{border: "0.5px solid grey", textAlign: "center"}} className="cart">
        <Space>
          <Image
            width={300}
            src={"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1-1200x800.jpg"}
          />
        </Space>
        <Space direction="vertical" style={{columnGap: 0, textAlign: "left"}}>
          <Title level={4} onClick={() => navigate("/" + 2)}
                 style={{cursor: "pointer"}}>Product: {"lala"}</Title>
          <Text><b>Brand: </b>{"lala"}</Text>
          <Title level={5}>Price: ${"lala"}</Title>
          <Text><b>Category: </b>{"lala"}</Text>
          <Text><b>Size: </b>{"lala"}</Text>
          <Text><b>Color: </b>{"lala"}</Text>
        </Space>
      </Card>
    </Space>
  </Content>
}