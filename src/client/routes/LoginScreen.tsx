import React, { useEffect, useState } from "react";
import { AuthFormContainer } from "../components/AuthFormContainer";
import { User } from "../../types/user";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { useLoginMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import { createToast } from "../utils/errorUtils";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<User["email"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      createToast({ error, type: "error" });
    }
  };
  return (
    <AuthFormContainer>
      <h1>Sign In</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleLogin}>
          <FormGroup controlId="email" className="my-3">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" className="my-3">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" variant="primary" className="mt-2">
            Sign In
          </Button>
        </Form>
      )}
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </AuthFormContainer>
  );
};
