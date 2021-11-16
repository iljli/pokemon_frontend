import { ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Pokeinfo from './Pokeinfo';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Pokelist(props) {
    const NUMBER_OF_POKEMONS = 4;

    //const URL = "http://localhost:4000/pokemon/"
    const URL = "https://nodejs-pokemon.herokuapp.com/fighters/"

    const [data, setData] = useState([]);
    const [dataSingle, setDataSingle] = useState([]);
    // if (data) console.log(data);

    const errorHandler = (error) => {
        // the error is passed as an object
        console.log(`Error Message: ${error.message}`); // does not actual handle the error
    };

    const getOnePokemon = (id, chooseSingle) => {
        fetch(URL + `${id}`)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`An error has occured during the request. HTTP status code: ${response.status}`)
                return response.json();
            }, errorHandler)
            .then((fetchedData) => {
                if (chooseSingle) {
                    setDataSingle(prev => [prev]);
                } else {
                    setData(prev => [...prev, fetchedData]);
                }

                // console.log(data)
                return false;
            })
    }

    const getSeveralPokemon = () => {
        for (let i = 0; i < NUMBER_OF_POKEMONS; i++) {
            if (getOnePokemon(Math.floor(Math.random() * 100)), false) {
                if (i > 1) i--;
            }
        }
    }

    const playGame = () => {
        console.log("Game started...");

    }

    useEffect(() => {
        getSeveralPokemon();
    }, [])


    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={playGame}>Contained</Button>
                <Button variant="contained" disabled>
                    Disabled
                </Button>
            </Stack>
            List of pokemons
            {data.map((elem, index) => {
                console.log(elem)

                {/* return <Pokeinfo key={index} data={{ ...elem }[0]} /> // MB */ }
                return <Pokeinfo key={index} data={{ ...elem }} />
            })}
        </div>
    )
}


export default Pokelist

