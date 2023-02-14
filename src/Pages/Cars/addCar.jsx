import { useRef } from "react";
import { useNavigate } from "react-router-dom";




function AddCar() {
    
    const navigate = useNavigate('/')
    const name = useRef(null);
    const model = useRef(null);
    const probeg = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name.current.value,
            model: model.current.value,
            probeg: probeg.current.value
        }

        if (name.current.value.length > 0 && model.current.value.length > 0) {
            fetch('http://127.0.0.1:3001/create_car', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
            navigate('/')
            return
        } else {
            alert("Barcha fildlarni to'ldiring")
        }

    }


    return (
        <>
        
            <form className="form" onSubmit={onSubmit}>
                <input ref={name} className="formInput" type="text" placeholder="Name" />
                <input ref={model} className="formInput" type="text" placeholder="Model" />
                <input ref={probeg} className="formInput" type="text" placeholder="Probeg" />
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        
        </>
    )

}

export default AddCar;