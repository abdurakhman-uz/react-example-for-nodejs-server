import { Button, Input, Form, message, Select } from "antd";
import {motion} from "framer-motion"
import "../../global.css"

const { Option } = Select;

function AddUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const Finish = (values) => {
    const success = (messages) => {
      messageApi.open({
        type: "success",
        content: messages,
      });
    };

    const error = (messages) => {
      messageApi.open({
        type: "error",
        content: messages,
      });
    };

    fetch(process.env.REACT_APP_BECKEND + "/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        success(data.msg);
        console.log(data);
      })
      .catch((err) => {
        error(err.msg);
        console.log(err);
      });
  };
  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const animation = {
    hidden: {
      x: 50,
      opacity: 0
    },
    visible: {
      x: 0,
      y: 1,
      opacity: 1
    }
  }

  return (
    <>
      {contextHolder}

      <motion.div 
        className="addUser"
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className="Btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </>
  );
}

export default AddUser;