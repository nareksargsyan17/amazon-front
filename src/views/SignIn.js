import {Button, Form, Input, Checkbox, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
const {Title} = Typography;

export default function SignIn() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Layout style={{display: "flex", justifyContent: "center", background:"white", alignItems:"center", height: "100%", margin: "0 50px"}}>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "400px",
          padding: "40px",
          boxShadow: "1px 1px 10px 0px rgba(0,0,0,0.75)"}}
        onFinish={onFinish}
      >
        <Form.Item>
          <Title style={{textAlign: "center"}}>Sign In</Title>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </Form>
    </Layout>

  );
}