import { useEffect, useState } from "react";
import { message, Form, Input, Button, Card } from "antd";
import { motion } from "framer-motion";
import "../../global.css";

import { EditOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import ModalForm from "../../Components/Modal/Modal";
import { fadeIn, staggerContainer } from "../../Components/Motion/Motion";
const { confirm } = Modal;
const { Meta } = Card;

const token = localStorage.getItem("token")

function Products() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);

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
    fetch(`http://localhost:3001/product/${show[1]}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        success(data.msg)
        setDeleted(true)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        error(err.msg)
      });

    console.log(values, show[1]);
  };

  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showDeleteConfirm = (e) => {
    const dataId = e.target.dataset.id;
    console.log(e.target.dataset.id);

    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        fetch(`http://localhost:3001/product/${dataId}`, { 
          method: "DELETE"
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
            error(err.msg);
          });

        console.log(`Deleted: ${dataId}`);
      },
      onCancel() {
        console.log(`ID: ${dataId}`);
      },
    });
  };

  const BasicCard = (item) => (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="product-image"
          src={item.img}
        />
      }
      actions={[
        token ? (
          <EditOutlined key="edit" onClick={() => setShow([true, item.id])}/>
        ) : '',
        <ShareAltOutlined key="share" />,
        token ? (
          <DeleteOutlined key="delete" data-id={item.id} onClick={(e) => showDeleteConfirm(e)}/>
        ) : ''
      ]}
    >
      <Meta
        title={item.name}
        description={item.desc}
        price={item.price}
      />
    </Card>
  );

  return (
    <>
      {contextHolder}

      <div className="products">
        {data ? (
          data.map((item) => (
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
                  variants={fadeIn("up", "tween", 0.2, 0.4)}
                  className={`cards`}
                >
                  { BasicCard(item) }
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
