import { useEffect, useState } from "react";
import { message, Form, Input, Button } from "antd";
import { motion } from "framer-motion";
import "../../global.css";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import ModalForm from "../../Components/Modal/Modal";
import {
  fadeIn,
  slideIn,
  staggerContainer,
  zoomIn,
} from "../../Components/Motion/Motion";
const { confirm } = Modal;

function Products() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  let id = null;

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.msg);
        setDeleted(false);
      })
      .catch((err) => {
        setData({ data: [] });
        setDeleted(false);
      });
  }, [deleted]);

  const Finish = (values) => {
    fetch(`http://localhost:3001/products/${show[1]}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(values, show[1]);
  };

  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showDeleteConfirm = (e) => {
    const dataId = e.target.dataset.id;
    id = dataId;

    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        fetch(`http://localhost:3001/products/${id}`, { 
          method: "DELETE",
          body: JSON.stringify({ProductId: id})
         }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setDeleted(true);
            success(data.msg);
          })
          .catch((err) => {
            console.log(err);
            error(data.msg);
          });

        console.log(`Deleted: ${dataId}`);
      },
      onCancel() {
        console.log(`ID: ${dataId}`);
      },
    });
  };

  return (
    <>
      {contextHolder}

      <div className="products">
        {data ? (
          data.map((item) => (
            // <div className="cardsWrapper">
              <motion.div
                animate={{
                  x: 0,
                  y: 20,
                  scale: 1,
                  rotate: 0,
                }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                key={item.id}
                className="cardsWrapper"
              >
                <motion.div
                  // variants={zoomIn(0.2, 0.7)}
                  variants={fadeIn("up", "tween", 0.2, 0.4)}
                  className="cards"
                >
                  <div className="card">
                    <p className="card-name">Name: {item.name}</p>
                    <p className="card-desc">Description: {item.desc}</p>
                    <p className="card-price">Price: {item.price}</p>
                  </div>

                  {token ? (
                    <div className="config">
                      <button
                        className="edit"
                        data-id={item.id}
                        onClick={() => setShow([true, item.id])}
                      ></button>
                      <button
                        className="delete"
                        onClick={(e) => showDeleteConfirm(e)}
                        data-id={item.id}
                      ></button>
                    </div>
                  ) : null}
                </motion.div>
              </motion.div>
            // </div>
          ))
        ) : (
          <div>Failed to load data</div>
        )}
      </div>

      <ModalForm
        title="Edit Product"
        onClose={() => setShow(false)}
        show={show[0]}
      >
        <Form
          className="modalForms"
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
            label="Desc"
            name="description"
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
      </ModalForm>
    </>
  );
}

export default Products;
