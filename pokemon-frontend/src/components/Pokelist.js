import { ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Pokeinfo from './Pokeinfo';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function Pokelist(props) {
    const NUMBER_OF_POKEMONS = 5;
    const SINGLE_POKEMON = true;
    const SEVERAL_POKEMON = false;

    //const URL = "http://localhost:4000/pokemon/"
    const URL = "https://nodejs-pokemon.herokuapp.com/fighters/"

    const [allPokemons, setAllPokemons] = useState();

    const [hasPlayed, setHasPlayed] = useState(false);
    const [userSelection, setUserSelection] = useState();
    const [opponentSelection, setOpponentSelection] = useState();
    const [userWon, setUserWon] = useState();
    const [computerSelectionName, computerUserSelectionName] = useState("");

    const errorHandler = (error) => {
        console.log(`Error Message: ${error.message}`); // does not actual handle the error
    };

    // const getOnePokemon = (id, chooseSingle) => {
    //     fetch(URL + `${id}`)
    //         .then((response) => {
    //             if (!response.ok)
    //                 throw new Error(`An error has occured during the request. HTTP status code: ${response.status}`)
    //             return response.json();
    //         }, errorHandler)
    //         .then((fetchedPokemon) => {
    //             if (chooseSingle) {
    //                 // console.log(fetchedPokemon);
    //                 // setOpponentSelection(() => fetchedPokemon);
    //                 setOpponentSelection(fetchedPokemon);

    //             } else {
    //                 setAllPokemons(prev => [...prev, fetchedPokemon]);
    //             }

    //             // console.log(data)
    //             return false;
    //         })
    // }

    // const getSeveralPokemon = () => {
    //     for (let i = 0; i < NUMBER_OF_POKEMONS; i++) {
    //         if (getOnePokemon(Math.floor(Math.random() * 100), SEVERAL_POKEMON)) {
    //             if (i > 1) i--;
    //         }
    //     }
    // }



    // const playGame = () => {
    //     console.log("Game started..."); // but it has not on useEffect !!!
    //     getOnePokemon(Math.floor(Math.random() * 100), SINGLE_POKEMON);
    //     // setOpponentSelection(123);
    //     // console.log(opponentSelection);
    //     console.log("userSelection:");
    //     console.log(userSelection);
    //     userSelection && console.log(userSelection.name.english);
    //     console.log("opponentSelection:");
    //     console.log(opponentSelection);
    //     opponentSelection && console.log(opponentSelection.name.english);
    //     if ((typeof userSelection !== 'undefined') && (typeof opponentSelection !== 'undefined')) {
    //         computerUserSelectionName(opponentSelection.name.english);
    //         console.log(`userSelection: ${userSelection.base.Attack} opponentSelection: ${opponentSelection.base.Defense}`)
    //         if (userSelection.base.Attack >= opponentSelection.base.Defense) {
    //             setUserWon(true);

    //         } else {
    //             setUserWon(false)
    //         }
    //     }
    // }

    const playGame = () => {
        console.log('Playing')
        // console.log("Game started..."); // but it has not on useEffect !!!
        // getOnePokemon(Math.floor(Math.random() * 100), SINGLE_POKEMON);
        // // setOpponentSelection(123);
        // // console.log(opponentSelection);
        // console.log("userSelection:");
        // console.log(userSelection);
        // userSelection && console.log(userSelection.name.english);
        // console.log("opponentSelection:");
        // console.log(opponentSelection);
        // opponentSelection && console.log(opponentSelection.name.english);
        // if ((typeof userSelection !== 'undefined') && (typeof opponentSelection !== 'undefined')) {
        //     computerUserSelectionName(opponentSelection.name.english);
        //     console.log(`userSelection: ${userSelection.base.Attack} opponentSelection: ${opponentSelection.base.Defense}`)
        //     if (userSelection.base.Attack >= opponentSelection.base.Defense) {
        //         setUserWon(true);

        //     } else {
        //         setUserWon(false)
        //     }
        // }
        if (userSelection.base.Attack >= opponentSelection.base.Defense) {
            setUserWon("player");

        } else {
            setUserWon("computer")
        }
    }

    const onSelect = (data) => {
        console.log(data);
        setUserSelection(data);
    }
    // i need to restart the discord - not the computer - this would take to long
    useEffect(() => {
        const getOnePokemon = (id) => {
            return fetch(URL + `${id}`)
                .then((response) => {
                    if (!response.ok)
                        throw new Error(`An error has occured during the request. HTTP status code: ${response.status}`)
                    return response.json();
                }, errorHandler)
                .then((fetchedPokemon) => fetchedPokemon)
        }

        const getSeveralPokemon = () => {
            const pokemonPromises = Array.from({ length: NUMBER_OF_POKEMONS }, (_, i) => i + 1).map(id => { // [1,2,3,4,5]
                return getOnePokemon(id)
            })
            Promise.all(pokemonPromises).then(allPks => {
                setAllPokemons(allPks)
            })
        }

        getSeveralPokemon();
        // playGame();
    }, [])

    useEffect(() => {
        if (userSelection) {
            const filteredPokemons = allPokemons.filter(p => p.id !== userSelection.id)
            const opponent = filteredPokemons[Math.floor(Math.random() * filteredPokemons.length)]
            console.log(opponent)
            setOpponentSelection(opponent)
        }
    }, [userSelection])

    console.log('I have been rendered')

    // 0/ Load all the pokemons from the backend ==> state AllPokemons
    // 1/ List all the pokemons on the screen
    // 2/ Allow user to select one
    // 3/ Assign a random pokemon to the computer
    // 4/ Start the fight

    const getWinner = () => {
        if (userWon === 'player') return <Alert severity="success" sx={{ width: "400px" }}>Your Pokemon has won!</Alert>
        else if (userWon === 'computer') return <Alert severity="error" sx={{ width: "400px" }}>Sorry, you lost...</Alert>
        else return null
    }

    if (!allPokemons) return <h1>Loading Pokemons</h1>

    console.log(opponentSelection)

    return (
        <div>
            {!userWon && <Stack direction="row" spacing={2}>
                {userSelection && opponentSelection && <Button variant="contained" onClick={playGame}>Play Game</Button>}



                {userSelection && <TextField
                    id="outlined-uncontrolled"
                    // label="Your choice"
                    helperText="Your choice"
                    value={userSelection && `${userSelection.name.english}`}
                />}

                {opponentSelection && <TextField
                    id="outlined-uncontrolled"
                    // label="Computer's choice"
                    helperText="Computer's choice"
                    value={opponentSelection && `${opponentSelection.name.english}`}
                />}
            </Stack>}
            {getWinner()}
            <br />
            Choose Your Pokemon from the list below:
            {allPokemons.map((elem, index) => {
                {/* console.log(elem) */ }

                {/* return <Pokeinfo key={index} data={{ ...elem }[0]} /> // MB */ }
                return <Pokeinfo key={index} data={{ ...elem }} onSelect={onSelect} />
            })}
        </div>
    )
}


export default Pokelist

