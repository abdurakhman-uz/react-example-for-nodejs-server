import {useEffect, useState} from "react"
import '../../Global.css';

function Cars() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:3001/cars').then((res) => res.json()).then(data => {
            setData({data})
        }).catch(err => {
            setData({data: []})
        })
    }, [])

    return (

        <>
            <div className="Global">
                {
                data.data ? (data.data.map((item) => (
                    <div className="cards">
                        <p key={item.id} ></p>
                        <p className="card-name">Марка: {
                            item.name
                        }</p>
                        <p className="card-model">Модель: {
                            item.model
                        }</p>
                        <p className="card-probeg">Пробег: {
                            item.probeg
                        }</p>
                    </div>
                ))) : <div>Failed to load data</div>
            } </div>

        </>


    );
}

export default Cars;
