import { Grid, Typography } from '@mui/material';
import React from 'react';

const historyBike= 'https://i.ibb.co/cD11j16/image-Dream-D.png';
const worldWide="https://i.ibb.co/t3DVBvL/world-map.jpg";
const historyBg ={
    background: `url(${worldWide})`,
    padding:'50px 0'
}
const History = () => {
    return (
        <Grid style={historyBg} container spacing={2}>

        {/* home page history image */}
            <Grid item xs={12} md={6}>
                <img style={{width:'90%'}} src={historyBike} alt=""/>
            </Grid>

            {/* home page history */}
            <Grid sx={{display:'flex',justifyContent: 'center', alignItems: 'center'}} item xs={12} md={6}>
                <Grid>
                    <Typography variant="h3" sx={{mb:5}}>Over 400,000,000 units</Typography>
                    <Typography variant="h6">
                    have been produced globaly since Honda started motorcycle <br/> production in 1949. Honda is now producing at 35 plants <br/> in 21 countries. Episode from Honda's founding. Providing insight <br/> into Honda's philosophy, passion and origins.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default History;