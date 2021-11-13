import { Alert, AlertTitle, Grid, Typography,Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../Contexts/useAuth';

const LeftReview = () => {
    const [orderedSuccess, setOrderedSuccess] = useState(false);
    const {user} = useAuth();

        // react hook form
        const { register, handleSubmit, reset } = useForm();

        const onSubmit = data => {
            data = {...data, name: user?.displayName}
            fetch('https://glacial-inlet-84612.herokuapp.com/customerReviews', {
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
        <>
        <Typography sx={{mb:3}} variant="h3">Left Your Valuable Feedback Please!!!</Typography>
        <Box sx={{my:8}}>
            <Grid container spacing={5} sx={{px:3}}>
                <Grid item xs={12}md={3}>
                </Grid>
                <Grid className='exploreProductForm' item xs={12} md={6}>
                        <form onSubmit={handleSubmit(onSubmit)}>

                        {/* success message */}
        {orderedSuccess && <Alert severity="success">
            <AlertTitle>Successfully Reviewed</AlertTitle>
            click hare to see your <Link to="/home">Reviews</Link> 
            </Alert>}

            {/* customers reviews input */}
                            <input  {...register("name")} defaultValue={user?.displayName}/>
                            <input type="number" {...register("rating", { min: 1, max: 5 })} placeholder="Ratings (1-5)"/>
                            <textarea style={{minHeight:'150px'}} {...register("feedback")} placeholder="Write your feedback about our products...."/>
                            <Button variant='contained' type="submit" >submit</Button>
                        </form>
                </Grid>
                <Grid item xs={12}md={3}>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default LeftReview;