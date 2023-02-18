import { Link } from "react-router-dom";
import './Navbar.css'

const token = localStorage.getItem("token")

function Navbar() {
    return (
        <>
            <div>
                <div className="navbar">
                    <Link to='/' className="link">
                        Home
                    </Link>
                    <Link to='/' className="link">
                        Products
                    </Link>
                    {
                        token ? 
                            <Link to='/add' className="link">
                                Add
                            </Link> :

                            <Link to='/login' className="link">
                                Login
                            </Link>

                    }
                </div>
                <span className="navLine"></span>
            </div>
        </>
    )
}

export default Navbar;