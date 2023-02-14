import {useEffect, useRef, useState} from "react"
import '../../Global.css';

function Fruits() {

    const [data, setData] = useState([])
    const name = useRef(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/fruits').then((res) => res.json()).then(data => {
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
                        <p className="card-name">Fruit: {
                            item.name
                        }</p>
                        <p className="card-model">Color: {
                            item.color
                        }</p>
                    </div>
                ))) : <div>Failed to load data</div>
            } </div>

        </>


    );
}


export default Fruits;
