import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
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
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      title={item.name}
      description={item.desc}
    />
  </Card>
);
export default BasicCard;