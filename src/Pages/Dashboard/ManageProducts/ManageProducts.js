import React, {useState, useEffect} from 'react';
import { CircularProgress, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const ManageProducts = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() =>{
        fetch('https://glacial-inlet-84612.herokuapp.com/motorsAll')
        .then(res=>res.json())
        .then(data=>setAllProducts(data))
    }, [])
    

    // delete manage product handler
    const handleDeleteProduct = (id) =>{
    const confirmed = window.confirm('Are you sure you want to cancel');
    if(confirmed){
        fetch(`https://glacial-inlet-84612.herokuapp.com/motorsAll/${id}`,{
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
                alert('Order canceled')
                const balanceOrdered = allProducts.filter(order=> order?._id !== id);
                setAllProducts(balanceOrdered)
            }
        })
    }
    else{
        alert('Thanks')
    }
}


    return (
        <>
<Container sx={{mt:8, mb:8}}>
        <Typography sx={{mb:5}} variant="h4">Manage Products</Typography>
            {allProducts.length===0 ? <CircularProgress color="success"/> :
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {allProducts.map(model=><Grid item xs={2} sm={4} md={3} key={model?._id}>

                    {/* manage products card */}
                        <Card sx={{ maxWidth: 345 }}>

                        {/* card image */}
                            <CardMedia
                                component="img"
                                height="180"
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
                            <CardActions>

                            {/* card button */}
                            <Button onClick={()=>handleDeleteProduct(model?._id)}
 style={{backgroundColor:'red'}} variant="contained" size="small">Delete Product</Button>
                            </CardActions>
                        </Card> 
                    </Grid>)}
            </Grid>}
</Container>   
    </>
    );
};

export default ManageProducts;
