import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  notification,
  Result,
  Skeleton
} from 'antd';
import "../App.css";

import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postRegistrationRequest } from "../redux/auth/actions";
import { useEffect } from "react";
import { usePrevious } from "@react-hooks-library/core";
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8
    },
  },
};

const Registration = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    isPostRegistrationRequest,
    isPostRegistrationSuccess,
    isPostRegistrationFailure,
    errorMessage
  } = useSelector(state => state.auth);
  const navigate = useNavigate()
  const prevSucces = usePrevious(isPostRegistrationSuccess);
  const prevFailure = usePrevious(isPostRegistrationFailure);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    if (isPostRegistrationFailure && prevFailure === false) {
      notification["error"]({
        duration: 3,
        description: errorMessage
      });
    }
  }, [errorMessage, isPostRegistrationFailure, navigate, prevFailure]);

  const onFinish = (values) => {
    const {agreement, confirm, ...data} = values;
    dispatch(postRegistrationRequest({...data, re_password: confirm}));
  };

  return (
    <Layout style={{
      display: "flex",
      justifyContent: "center",
      background: "white",
      alignItems: "center",
      height: "100%",
      margin: "0 50px"
    }}>
      {
        isPostRegistrationSuccess && prevSucces === false ? (
          <Skeleton active loading={isPostRegistrationRequest}>
            <Result
              status="success"
              title="Message has been sent to your email address"
            />
          </Skeleton>
        ) : (
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
              textAlign: "center",
              width: "600px",
              background: "transparent",
              padding: "40px 100px 40px 0",
              boxShadow: "1px 1px 10px 0px rgba(0,0,0,0.75)"
            }}
            scrollToFirstError
          >
            <Form.Item
              {...tailFormItemLayout}
            >
              <Title>Registration</Title>
            </Form.Item>
            <Form.Item
              name="firstName"
              label="FirstName"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your FirstName!',
                  whitespace: true,
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="lastName"
              label="LastName"
              rules={[
                {
                  required: true,
                  message: 'Please input your LastName!',
                  whitespace: true,
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password! (minimum 3 symbol)',
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
              <Input.Password/>
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                I have read the <a href="#">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                style={{width: "100%"}}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isPostRegistrationRequest}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        )
      }
    </Layout>

  );
};
export default Registration;