import { useRef } from "react";
import { useNavigate } from "react-router-dom";




function AddFruit() {
    
    const navigate = useNavigate('/')
    const name = useRef(null);
    const color = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name.current.value,
            color: color.current.value,
        }

        if (name.current.value.length > 0 && color.current.value.length > 0) {
            fetch('http://127.0.0.1:3001/create_fruit', {
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
            navigate('/fruits')
            return
        } else {
            alert("Barcha fildlarni to'ldiring")
        }

    }


    return (
        <>
        
            <form className="form" onSubmit={onSubmit}>
                <input ref={name} className="formInput" type="text" placeholder="Name" />
                <input ref={color} className="formInput" type="text" placeholder="Color" />
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        
        </>
    )

}

export default AddFruit;