import React from 'react'

function Pokeinfo(props) {
    const { data } = props;
    const { name, type, base } = data[0];

    console.log(data)
    console.log(name, type, base);

    return (
        <div>
            <p>Name: {name.english} </p>
        </div>
    )
}


export default Pokeinfo

