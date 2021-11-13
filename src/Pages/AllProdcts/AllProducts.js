import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const AllProducts = () => {
    // state 
    const [models, setModels] = useState([]);
    useEffect(() =>{
        fetch('https://glacial-inlet-84612.herokuapp.com/motorsAll')
        .then(res=>res.json())
        .then(data=>setModels(data))
    }, [])
    return (
        <>
        <Header></Header>
<Container sx={{mt:8, mb:8}}>
        <Typography sx={{mb:5}} variant="h4">Global Model</Typography>
            {models.length===0 ? <CircularProgress color="success"/> :
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                
                    {models.map(model=><Grid item xs={2} sm={4} md={4} key={model?._id}>

                    {/* All Products Cart */}
                        <Card sx={{ maxWidth: 345 }}>

                        {/* card image */}
                            <CardMedia
                                component="img"
                                height="220"
                                image={model?.image}
                                alt="green iguana"
                            />

                            {/* card body */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {model?.name}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                $ {model?.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {model?.name} {model?.description.slice(0, 120)}
                                </Typography>
                            </CardContent>

                            {/* card button */}
                            <CardActions>
                                <Link to={`/exploreProduct/${model?._id}`}><Button variant="contained" size="small">Purchase Now</Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>)}
            </Grid>}
</Container>   
<Footer></Footer> 
    </>
    );
};

export default AllProducts;