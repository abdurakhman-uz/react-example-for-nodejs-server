import { Button, Form, Input } from "antd";
import {motion} from "framer-motion"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import "../../global.css";

const Login = () => {
  const navigate = useNavigate()
  const {token, setToken} = useContext(AuthContext)
  const Finish = (values) => {
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token)
          navigate("/")
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const animation = {
    hidden: {
      x: 0,
      y: 100,
      opacity: 0
    },
    visible: {
      x: 0,
      y: -1,
      opacity: 1
    }
  }

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={animation}
      >
        <Form
          className="loginForm"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={Finish}
          onFinishFailed={FinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className="modalButton" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </>
  );
};
export default Login;
