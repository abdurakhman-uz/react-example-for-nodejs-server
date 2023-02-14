import {useEffect, useState} from "react"
import '../../Global.css';

function Animals() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://kind-gold-adder-wig.cyclic.app/animals').then((res) => res.json()).then(data => {
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
                        <p className="card-name">Animal: {
                            item.name
                        }</p>
                    </div>
                ))) : <div>Failed to load data</div>
            } </div>

        </>


    );
}

export default Animals;
