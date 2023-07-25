import { Button, Result, Skeleton } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVerificationRequest } from "../redux/auth/actions";

export default function Verify() {
  const {userId, token} = useParams();
  const dispatch = useDispatch();
  const {
    isGetVerificationRequest,
    isGetVerificationSuccess,
    successMessage,
    errorMessage
  } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVerificationRequest({id: userId, token}));
  }, [dispatch, token, userId]);

  return <Skeleton active loading={isGetVerificationRequest} style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    width: "50%",
    margin: "40px auto"
  }}>
    {
      isGetVerificationSuccess ? (<Result
          style={{height: "100vh"}}
          status="success"
          title={successMessage}
          subTitle="Please go to Sign In"
          extra={[
            <Button type="primary" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
          ]}
        />
      ) : (
        <Result
          style={{height: "100vh"}}
          status="error"
          title={errorMessage}
          subTitle="Please try again"
          extra={[
            <Button type="primary" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          ]}
        />
      )
    }
  </Skeleton>
}