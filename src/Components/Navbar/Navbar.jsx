import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./Navbar.css";
const { confirm } = Modal;
const token = localStorage.getItem("token");

function Navbar() {
  const navigate = useNavigate();
  const showExitConfirm = () => {
    confirm({
      title: "Are you sure to exit?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        localStorage.removeItem("token");
        navigate("/");
      },
      onCancel() {
        console.log("Cencelled");
      },
    });
  };

  return (
    <>
      <div>
        {token ? (
          <div>
            <div className={`navbarLinks ${ token? "admin" : "" } `}>
              <Link to="/" className="link linkHome">
                {/* Home */}
              </Link>
              <Link to="/" className="link linkProducts">
                {/* Products */}
              </Link>
              {token ? (
                <Link to="/add" className="link linkAdd">
                  {/* Add */}
                </Link>
              ) : null}
            </div>
            {token ? (
              <Button className="logout" onClick={showExitConfirm}>
                Logout
              </Button>
            ) : null}
          </div>
        ) : (
            <div className="navbarLinksUser">
              <Link to="/" className="link linkHome">
                {/* Home */}
              </Link>
              <Link to="/" className="link linkProducts">
                {/* Products */}
              </Link>
            </div>
        )}

        <span className="navLine"></span>
      </div>
    </>
  );
}

export default Navbar;
