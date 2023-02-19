import {createContext, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Navbar} from "./Components";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Product";
import Add from "./Pages/Add/Add";
import AddProduct from "./Pages/Add/Product"
import AddUser from "./Pages/Add/User";
const token = localStorage.getItem("token")

export const MyContext = createContext()

function App() {

    const [edited, setEdited] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (token) {
            fetch("http://localhost:3001/auth/check", {
                method: 'POST',
                headers: {},
                body: JSON.stringify(
                    {token: token}
                )
            }).then(res => res.json()).then(data => {
                if (!data.msg) {
                    localStorage.removeItem("token")
                    console.log("error");
                }
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [token])

    return (

        <>
            <MyContext.Provider value={{ edited, setEdited, show, setShow }}>
                <Navbar/>

                <Routes>

                    <Route path='/'
                        element={<Products/>}></Route>
                    <Route path='/products'
                        element={<Products/>}></Route>

                    {
                    ! token ? <Route path='/login'
                        element={<Login/>}></Route> : <Route>
                        <Route path='/login'
                            element={
                                <Navigate
                            to='/'
                            replace/>
                            }/>
                        <Route path='/add'
                            element={<Add/>}>
                            <Route path="/add/addUser"
                                element={<AddUser/>}/>
                            <Route path="/add/addProduct"
                                element={<AddProduct/>}/>
                            <Route index
                                element={<AddProduct/>}/>
                        </Route>
                    </Route>
                } </Routes>
            </MyContext.Provider>
        </>

    );
}

export default App;
