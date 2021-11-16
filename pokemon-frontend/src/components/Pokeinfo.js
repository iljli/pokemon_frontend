import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

function Pokeinfo(props) {
    const { data } = props;
    // const [pokeInfo, setPokeInfo] = useState();

    const properties = (Object.entries(data.base));
    // console.log(properties);

    const btnChoose = () => {
        console.log(`Choosed Pokemon: ${data.id}`);
        console.log(`Choosed Pokemon: ${data.name.english}`);
    }


    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Pokemon's Japanese Name:
                    </Typography>
                    <Typography variant="h5" component="div">
                        {data && data.name.japanese}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {data && data.name.english}
                    </Typography>
                    <Typography variant="body2">
                        Type: <br />
                        {data && data.type.map((entry) => entry + " ")}
                        {/* {properties_key && properties_key.map((value) => value + " ")} */}
                    </Typography>
                    <br />
                    <div className="center">
                        {properties && properties.map((data, index) => {
                            return (
                                <section className="center" key = {index}>
                                    {data[0]}
                                    < CircularProgressWithLabel value={data[1]} />
                                </section>
                            )
                        })}
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={btnChoose} >Choose to fight with</Button>
                </CardActions>
            </Card>
        </div>
    )
}


export default Pokeinfo

