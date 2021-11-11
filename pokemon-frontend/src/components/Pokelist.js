import React, { useEffect, useState } from 'react'
import Pokeinfo from './Pokeinfo';

function Pokelist(props) {
    const URL = "http://localhost:4000/pokemon/"

    const [data, setData] = useState();

    const errorHandler = (error) => {
        // the error is passed as an object
        console.log(`Error Message: ${error.message}`); // does not actual handle the error
    };

    useEffect(() => {
        fetch(URL + "10")
            .then((response) => {
                if (!response.ok)
                    throw new Error(`An error has occured during the request. HTTP status code: ${response.status}`)
                return response.json();
            }, errorHandler)
            .then((fetchedData) => {
                setData(fetchedData);
            })
    }, [])

    return (
        <div>
            List of pokemons
            <Pokeinfo data={data} />
        </div>
    )
}


export default Pokelist

