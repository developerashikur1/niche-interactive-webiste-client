import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router';
import useAuth from '../../../Contexts/useAuth';
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';

const Register = () => {
    const {googleSignInMethod, emailPasswordRegisterMethod} = useAuth();
    const history = useHistory();
    
    // react hook form
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = data => {
      const email= data?.email;
      const password= data?.password;
      const name=data?.firstName + ' ' + data.lastName;
      emailPasswordRegisterMethod(email, password, name, history)
      reset();
    };
    

    return (
        <>

        {/* registration section */}
        <Header></Header>
        <Box sx={{my:8}}>
        <Typography sx={{mb:3}} variant="h3">Please Register</Typography>
        <Grid container spacing={5} sx={{px:3}}>
        <Grid item xs={12}md={3}>
        </Grid>
        <Grid className='exploreProductForm' item xs={12} md={6}>

        {/* registration form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("firstName")} placeholder='First Name'/>
                    <input {...register("lastName")} placeholder="Last Name"/>
                    <input type="email" {...register("email")} placeholder="Your Email"/>
                    <input type="password" {...register("password")} placeholder="Your Password"/>
                    <Button variant='contained' type="submit" >Register</Button>
                    <br/>
                    <Typography>
                        Already Registered? <Link to="/login">Login</Link>
                    </Typography>
                </form>
                <br/>

                {/* google sign in button */}
                <Button variant='contained' onClick={googleSignInMethod}>Sign In with Google</Button>
        </Grid>
        <Grid item xs={12}md={3}>
        </Grid>
        </Grid>
        </Box>
        <Footer></Footer>
        </>
    );
};

export default Register;