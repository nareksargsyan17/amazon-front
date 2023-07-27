import { Button, Form, Input, Typography, notification, Spin } from "antd";
import {LoadingOutlined, LockOutlined} from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {changePasswordRequest} from "../redux/auth/actions";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import { usePrevious } from "@react-hooks-library/core";
const { Title } = Typography;

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isChangePasswordRequest,
    isChangePasswordSuccess,
    isChangePasswordFailure,
    userData
  } = useSelector(state => state.auth);
  const prevFailure = usePrevious(isChangePasswordFailure);
  const prevSuccess = usePrevious(isChangePasswordSuccess);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    if (isChangePasswordSuccess && prevSuccess === false) {
      notification["success"]({
        duration: 3,
        description: "Your Password was changed"
      });
      setTimeout(() => {
        navigate("/");
      }, 1000)
    }
    if (isChangePasswordFailure && prevFailure === false) {
      notification["error"]({
        duration: 3,
        description: "Your Password is not correct"
      });
    }
  }, [dispatch, navigate, prevFailure, prevSuccess, userData.token, isChangePasswordSuccess, isChangePasswordFailure]);

  const onFinish = (values) => {
    const {password, newPassword, confirm} = values;
    dispatch(changePasswordRequest({data: {password, newPassword, confirmNewPassword: confirm}, token: localStorage.getItem("token")}));
  };


  return (
    <Layout style={{display: "flex", justifyContent: "center", background:"white", alignItems:"center", height: "100%", margin: "0 50px"}}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={isChangePasswordRequest}>
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
            <Title style={{textAlign: "center"}}>Change Password</Title>
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
              placeholder="Your Password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please input your new password! (minimum 3 symbol)',
              },
              () => ({
                validator(_, value) {
                  if (value.length >= 3) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Password must have at least 3 symbol!'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{width: "100%"}}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isChangePasswordRequest}
            >
              Change
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Layout>

  );
}