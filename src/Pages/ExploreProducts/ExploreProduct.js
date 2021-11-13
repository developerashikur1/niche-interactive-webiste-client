import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Button, CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import './ExploreProduct.css'
import { Link } from 'react-router-dom';
import useAuth from '../Contexts/useAuth';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';


const ExploreProduct = () => {
    const {user} = useAuth();
    const {singleProductId} = useParams();
    const [models, setModels] = useState([]);
    const [orderedSuccess, setOrderedSuccess] = useState(false)
  
    useEffect(()=>{
        fetch('https://glacial-inlet-84612.herokuapp.com/motorsAll')
        .then(res=>res.json())
        .then(data=>setModels(data))
    },[])

    
    const targetedProduct= models.filter(model=>model._id == singleProductId);
    
    // react hook form
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
      const pair = {name:user?.displayName, email:user?.email , image:targetedProduct[0]?.image, price:targetedProduct[0]?.price, description:targetedProduct[0]?.description, productName:targetedProduct[0]?.name, status:'pending'};
      data = {...data, ...pair};

      fetch('https://glacial-inlet-84612.herokuapp.com/orderedUsers', {
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(data=>{
          if(data.insertedId){
              setOrderedSuccess(true)
          }
          setTimeout(function(){ setOrderedSuccess(false) }, 5000);
      })
    };



    return (
        <>
        <Header></Header>
        <Box sx={{mt:8, mb:8, mx:5}}>
            <Typography variant="h3" sx={{mb:5}}>Purchase Details</Typography>
            <Grid container spacing={5}>
            <Grid item xs={12} md={6}>

            {/* single purchase product card */}
                        <Card sx={{ maxWidth: "100%" }}>
                    
                    <CardActionArea>

                    {/* card image */}
                        <CardMedia
                        component="img"
                        width="100%"
                        image={targetedProduct[0]?.image}
                        alt="green iguana"
                        />

                        {/* card body */}
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                           {targetedProduct[0]?.name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                           {targetedProduct[0]?.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {targetedProduct[0]?.description}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card> 
            </Grid>


            {/* purchase react hook form layout */}
            <Grid className='exploreProductForm' item xs={12} md={6}>
                <form onSubmit={handleSubmit(onSubmit)}>

                {/* success message */}
                {orderedSuccess && <Alert severity="success">
                <AlertTitle>Ordered Succeed</AlertTitle>
                click hare to see your orders <Link to="/dashboard/myOrders">My Order</Link> — <strong>check it out!</strong>
                </Alert>}


                {/* react hook form */}
                    <input disabled {...register("name")} defaultValue={user?.displayName}/>
                    <input disabled type="email" {...register("email")} defaultValue={user?.email} />
                    <input type="number" {...register("phoneNumber")} placeholder='Phone Number'/>
                    <input type="number" {...register("age")} placeholder='Your Age'/> 
                    <input {...register("address")} placeholder='Address'/>
                    <input disabled {...register("productName")} defaultValue={targetedProduct[0]?.name}/>
                    <Button variant='contained' type="submit" >Place Order</Button>
                </form>
            </Grid>
            </Grid>
        </Box>
        <Footer></Footer>
        </>
    );
};

export default ExploreProduct;