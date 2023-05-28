import React, {useState} from "react";

import styles from '../App.css';
import { FaSearch } from "react-icons/fa";

function SearchBar() {
    const[input, setInput] = useState("");

    //API stuff
    const fetchData = (value: string) => { 
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`)
        .then((response) => response.json())
        .then(json => console.log(json));
        

    }

    const handleChange = (value: string) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <>
            <form>
                <div className="form-group d-flex align-items-center">
                    {/* <label htmlFor="formGroupExampleInput"></label> */}
                    <input type="text" className="form-control text-center" value={input} onChange={(e) => handleChange(e.target.value)} placeholder="Search for location"/>
                    <FaSearch type="submit" className="ms-2 me-2"></FaSearch>
                    
                </div>
            </form>

        </>
    )
}

export default SearchBar;