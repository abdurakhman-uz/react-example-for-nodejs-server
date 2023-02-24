import { Button, Input, Form, Select } from "antd";
import {motion} from "framer-motion"
import { Message } from "../../Components"
import "../../global.css"

const { Option } = Select;

function ExtraReg() {
  const Finish = (values) => {

    fetch(process.env.REACT_APP_BECKEND + "/auth/extra/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.code === 1){
          return  Message("error", data.msg);
        } else {
          return  Message("success", data.msg);
        }
      })
      .catch((err) => {
        Message("error", err.msg);
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
      y: -20,
      opacity: 1
    }
  }

  return (
    <>
      <motion.div 
        className="extraRegWrapper"
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

          <h2>Extra Register</h2>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select
                    placeholder="Select gender"
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Reserved Password"
            name="extra"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
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
}

export default ExtraReg;