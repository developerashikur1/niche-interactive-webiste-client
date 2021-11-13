import { Box } from '@mui/system';
import React from 'react';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (

        // footer section
        <Box sx={{pb:5, pt:8}} style={{backgroundColor:'whiteSmoke'}}>

        {/* footer social icons */}
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap:3, mb:3}}>
                <FacebookIcon sx={{fontSize:'50px', color:'#2979ff'}}></FacebookIcon>
                <LinkedInIcon sx={{fontSize:'50px', color:'#2979ff'}}></LinkedInIcon>
                <TwitterIcon sx={{fontSize:'50px', color:'#2979ff'}}></TwitterIcon>
            </Grid>

            {/* subscribe inputs */}
            <Grid>
                <InputGroup style={{width:'75%', margin: 'auto'}} className="mb-3">
                    <FormControl
                    width='95%'
                    placeholder="Your email"
                    aria-label="Your Email"
                    type="email"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="contained" id="basic-addon2">Subscribe</Button>
                </InputGroup>
            </Grid>


            {/* footer logo image */}
            <Grid  sx={{pb:3}}>
                <img style={{width:'15%'}} src="https://i.ibb.co/P5XpRcN/5ede4cfcab1c8-thumb900.png" alt=""/>
            </Grid>

            {/* footer short link */}
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap:3}}>
               <Link style={{textDecoration:'none', color:'grey', fontWidth:'800px', fontSize:'22px'}} to="/home">Home</Link>
               <Link style={{textDecoration:'none', color:'grey', fontWidth:'800px', fontSize:'22px'}} to="/allProducts">All Products</Link>
               <Link style={{textDecoration:'none', color:'grey', fontWidth:'800px', fontSize:'22px'}} disabled to="/home">about</Link>
            </Grid>
        </Box>
    );
};

export default Footer;