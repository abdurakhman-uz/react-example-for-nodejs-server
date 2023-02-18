import { Link, Outlet } from "react-router-dom";
import "../../global.css"

function Add() {


  return (
    <>
      <div className="nestedLinks">
        <Link className="nestedLink" to="/add/addUser">
          Add User
        </Link>
        <span>|</span>
        <Link className="nestedLink" to="/add/addProduct">
          Add Product
        </Link>
      </div>
      <Outlet/>
    </>
  );
}

export default Add;