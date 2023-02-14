import {Route, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Cars from "./Pages/Cars/Cars";
import AddCar from "./Pages/Cars/addCar";
import Fruits from "./Pages/Fruits/Fruits";
import AddFruit from "./Pages/Fruits/addFruit";
import Animals from "./Pages/Animals/Animals";
import AddAnimal from "./Pages/Animals/addAnimal";


function App() {

    return (

        <>

            <Navbar/>

            <Routes>

              <Route path='/' element={<Cars/>}></Route>
              <Route path='/cars' element={<Cars/>}></Route>
              <Route path='/fruits' element={<Fruits/>}></Route>
              <Route path='/animals' element={<Animals/>}></Route>
              <Route path='/addcar' element={<AddCar/>}></Route>
              <Route path='/addfruit' element={<AddFruit/>}></Route>
              <Route path='/addanimal' element={<AddAnimal/>}></Route>

            </Routes>
        </>

    );
}

export default App;
