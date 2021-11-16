import { ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Pokeinfo from './Pokeinfo';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function Pokelist(props) {
    const NUMBER_OF_POKEMONS = 4;
    const SINGLE_POKEMON = true;
    const SEVERAL_POKEMON = false;

    //const URL = "http://localhost:4000/pokemon/"
    const URL = "https://nodejs-pokemon.herokuapp.com/fighters/"

    const [data, setData] = useState([]);
    const [dataSingle, setDataSingle] = useState(0);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [userSelection, setUserSelection] = useState();
    const [userWon, setUserWon] = useState();
    const [computerSelectionName, computerUserSelectionName] = useState("");

    const errorHandler = (error) => {
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
                    // console.log(fetchedData);
                    // setDataSingle(() => fetchedData);
                    setDataSingle(fetchedData);

                } else {
                    setData(prev => [...prev, fetchedData]);
                }

                // console.log(data)
                return false;
            })
    }

    const getSeveralPokemon = () => {
        for (let i = 0; i < NUMBER_OF_POKEMONS; i++) {
            if (getOnePokemon(Math.floor(Math.random() * 100), SEVERAL_POKEMON)) {
                if (i > 1) i--;
            }
        }
    }

    const playGame = () => {
        console.log("Game started..."); // but it has not on useEffect !!!
        getOnePokemon(Math.floor(Math.random() * 100), SINGLE_POKEMON);
        // setDataSingle(123);
        // console.log(dataSingle);
        console.log("userSelection:");
        console.log(userSelection);
        userSelection && console.log(userSelection.name.english);
        console.log("dataSingle:");
        console.log(dataSingle);
        dataSingle && console.log(dataSingle.name.english);
        if ((typeof userSelection !== 'undefined') && (typeof dataSingle !== 'undefined')) {
            computerUserSelectionName(dataSingle.name.english);
            console.log(`userSelection: ${userSelection.base.Attack} dataSingle: ${dataSingle.base.Defense}`)
            if (userSelection.base.Attack >= dataSingle.base.Defense) {
                setUserWon(true);

            } else {
                setUserWon(false)
            }
        }
    }

    const onSelect = (data) => {
        console.log(data);
        setUserSelection(data);
    }

    useEffect(() => {
        getSeveralPokemon();
        playGame();
    }, [])


    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={playGame}>Play Game</Button>
                {/* <Button variant="contained" disabled> */}
                {/* Disabled */}
                {/* </Button> */}

                {userWon ?
                    <Alert severity="success" sx={{ width: "400px" }}>Your Pokemon has won!</Alert>
                    :
                    <Alert severity="error" sx={{ width: "400px" }}>Sorry, you lost...</Alert>
                }


                <TextField
                    id="outlined-uncontrolled"
                    // label="Your choice"
                    helperText="Your choice"
                    value={userSelection && `${userSelection.name.english}`}
                />

                <TextField
                    id="outlined-uncontrolled"
                    // label="Computer's choice"
                    helperText="Computer's choice"
                    value={computerSelectionName}
                />

            </Stack>
            <br/>
            Choose Your Pokemon from the list below:
            {data.map((elem, index) => {
                {/* console.log(elem) */ }

                {/* return <Pokeinfo key={index} data={{ ...elem }[0]} /> // MB */ }
                return <Pokeinfo key={index} data={{ ...elem }} onSelect={onSelect} />
            })}
        </div>
    )
}


export default Pokelist

