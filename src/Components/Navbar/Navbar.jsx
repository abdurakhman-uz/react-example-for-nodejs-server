import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <Link to='/' className="link">
                Home
            </Link>
            <Link to='/addcar' className="link">
                Add Car
            </Link>
            <Link to='/fruits' className="link">
                Fruits
            </Link>
            <Link to='/addfruit' className="link">
                Add Fruit
            </Link>
            <Link to='/animals' className="link">
                Animals
            </Link>
            <Link to='/addanimal' className="link">
                Add Animal
            </Link>
        </div>
    )
}

export default Navbar;