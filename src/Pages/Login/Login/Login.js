import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../Contexts/useAuth';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
const Login = () => {
    const {user, googleSignInMethod, emailPasswordSignInMethod} = useAuth();
    const location = useLocation();
    const history = useHistory();

    
    // react hook form
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        emailPasswordSignInMethod(data.email, data.password, location, history);
    };

    const handleGoogleSignInMethod = () =>{
        googleSignInMethod(location, history);
    }

    return (
       <>

       {/* login section */}
       <Header></Header>
        <Box sx={{my:8}}>
        <Typography sx={{mb:3}} variant="h3">Please Register</Typography>
        <Grid container spacing={5} sx={{px:3}}>
        <Grid item xs={12}md={3}>
        </Grid>
        <Grid className='exploreProductForm' item xs={12} md={6}>

        {/* login react hook form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="email" {...register("email")} placeholder="Your Email"/>
                    <input type="password" {...register("password")} placeholder="Your Password"/>
                    <Button variant='contained' type="submit" >Login</Button>
                    <br/>
                    <Typography>
                       Not a Member? <Link to="/register">Register Now</Link>
                    </Typography>
                </form>
                <br/>

                {/* login with google method button */}
                <Button variant='contained' onClick={handleGoogleSignInMethod}>Sign In with Google</Button>
        </Grid>
        <Grid item xs={12}md={3}>
        </Grid>
        </Grid>
        </Box>
        <Footer></Footer>
        </>
    );
};

export default Login;