import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Form, Input, Modal } from "antd";
import { useContext } from "react";
import { MyContext } from "../../App";
import {Message, ModalForm} from "../index";


const { Meta } = Card;
const { confirm } = Modal;

const token = localStorage.getItem("token");

const BasicCard = (item) => {
  const { edited, setEdited, show, setShow } = useContext(MyContext);
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
        fetch(process.env.REACT_APP_BECKEND + `/product/${dataId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setEdited(true);
            Message("success", data.msg);
          })
          .catch((err) => {
            console.log(err);
            Message("error", err.msg);
          });

        console.log(`Deleted: ${dataId}`);
      },
      onCancel() {
        console.log(`ID: ${dataId}`);
      },
    });
  };

  const Finish = (values) => {
    fetch(process.env.REACT_APP_BECKEND + `/product/${show[1]}`, {
      method: "PUT",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEdited(true);
        Message("success", data.msg);
      })
      .catch((err) => {
        console.log(err);
        Message("error", err.msg);
      });
    console.log(values, show[1]);
  };

  const FinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card
        style={{
          width: 300,
        }}
        cover={<img alt="product-image" src={item.img} />}
        actions={[
          token ? (
            <EditOutlined key="edit" onClick={() => setShow([true, item.id])} />
          ) : (
            ""
          ),
          <ShareAltOutlined key="share" />,
          token ? (
            <DeleteOutlined
              key="delete"
              data-id={item.id}
              onClick={(e) => showDeleteConfirm(e)}
            />
          ) : (
            ""
          ),
        ]}
      >
        <Meta title={item.name} description={item.desc} price={item.price} />
      </Card>

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
};
export default BasicCard;
