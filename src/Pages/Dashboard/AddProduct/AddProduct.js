import { Alert, AlertTitle, Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const [orderedSuccess, setOrderedSuccess] = useState(false)
    // react hook form
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
       
        fetch('https://glacial-inlet-84612.herokuapp.com/motorsAll', {
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
          reset();
    };

    return (
       <div>
            <Typography sx={{mb:3}} variant="h3">Add a Product Now</Typography>
            <Box sx={{my:8}}>
                <Grid container spacing={5} sx={{px:3}}>
                    <Grid item xs={12}md={3}>
                    </Grid>
                    <Grid className='exploreProductForm' item xs={12} md={6}>
                            <form onSubmit={handleSubmit(onSubmit)}>

                            {/* success message */}
            {orderedSuccess && <Alert severity="success">
                <AlertTitle>Added Product Successfully</AlertTitle>
                click hare to see your <Link to="/allProducts">All Products</Link> — <strong>check it out!</strong>
                </Alert>}

                {/* add Product Inputs */}
                                <input  {...register("name")} placeholder="Product Name"/>
                                <input type="url" {...register("image")} placeholder="Image url"/>
                                <input type="number" {...register("price")} placeholder="Product Price"/>
                                <input  {...register("description")} placeholder="Product Details"/>
                                
                                <Button variant='contained' type="submit" >Add</Button>
                            </form>
                    </Grid>
                    <Grid item xs={12}md={3}>
                    </Grid>
                </Grid>
            </Box>
       </div>
    );
};

export default AddProduct;