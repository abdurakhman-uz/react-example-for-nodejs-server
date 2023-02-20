import { Button, Input, Form, message } from "antd";
import {motion} from 'framer-motion'
import "../../global.css";
import { useState } from "react";

function AddProduct() {
  const [messageApi, contextHolder] = message.useMessage();
  const [img, setImg] = useState('')

  const Finish = (values) => {

    const { name, desc, price } = values

    const data = {
      name,
      desc,
      price,
      img
    }

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

    fetch(process.env.REACT_APP_BECKEND + "/products", {
      method: "POST",
      body: JSON.stringify(data),
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
      x: -50,
      opacity: 0
    },
    visible: {
      x: 0,
      y: 1,
      opacity: 1
    }
  }

  const uploadFile = async (e) => {
    const files = e.target.files;
    // console.log(e.target.files);
    const data = new FormData();
    data.append("file", files);
    data.append("upload", "assets");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/abduazimov/image/upload",
      {
        method: "POST",
        body: data
      }
    )
    const data2 = await res.json()
    // setImg(data2.secure_url);
    console.log(data2);
  }

  return (
    <>
      {contextHolder}

      <motion.div 
        className="addProduct"
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
            label="Name"
            name="name"
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
            label="Description"
            name="desc"
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
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Input required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <input type="file" className="upload" name="file" onChange={(e) => uploadFile(e)}/>
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

export default AddProduct;
