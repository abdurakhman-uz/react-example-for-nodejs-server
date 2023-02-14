import { useRef } from "react";
import { useNavigate } from "react-router-dom";




function AddAnimal() {
    
    const navigate = useNavigate('/')
    const name = useRef(null);
    const model = useRef(null);
    const probeg = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name.current.value,
        }

        if (name.current.value.length > 0) {
            fetch('http://127.0.0.1:3001/create_animal', {
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
            navigate('/animals')
            return
        } else {
            alert("Barcha fildlarni to'ldiring")
        }

    }


    return (
        <>
        
            <form className="form" onSubmit={onSubmit}>
                <input ref={name} className="formInput" type="text" placeholder="Name" />
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        
        </>
    )

}

export default AddAnimal;