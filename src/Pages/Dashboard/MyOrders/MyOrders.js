import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useAuth from '../../Contexts/useAuth';
import { Box } from '@mui/system';

const MyOrders = () => {
    const [orderedCars, setOrderedCards] = useState([]);
    const {user} = useAuth();

    useEffect(()=>{
        fetch(`https://glacial-inlet-84612.herokuapp.com/orderedUsers/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setOrderedCards(data)
        })
    },[user?.email])

    // customers delete orders handler
    const handleCancelOrder =(id)=>{
        const confirmed = window.confirm('Are you sure you want to cancel');
        if(confirmed){
            
            fetch(`https://glacial-inlet-84612.herokuapp.com/orderedUsers/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount>0){
                    alert('Order canceled')
                    const balanceOrdered = orderedCars.filter(ordered=> ordered?._id !== id);
                    setOrderedCards(balanceOrdered)
                }
            })
        }
        else{
            alert('Thanks')
        }
    }

    return (
        <div>
            <h2 style={{paddingBottom: '55px'}}>My Orders </h2>
            <Grid container spacing={5} columns={12}>
                {orderedCars.map(orderedCar=><Grid 
                key={orderedCar?._id}
                 item xs={12}
                  md={4}>

                  {/* customer orders manage card */}
                     <Card>
                        <CardActionArea>

                        {/* card image */}
                            <CardMedia
                            component="img"
                            height="225"
                            image={orderedCar?.image}
                            alt="green iguana"
                            />

                            {/* card body */}
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {orderedCar?.name} 
                                <br/>
                                $ {orderedCar?.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {orderedCar?.description.slice(0, 120)}
                            </Typography>
                            </CardContent>
                        </CardActionArea>

                        {/* card buttons */}
                        <Box sx={{ display: 'flex',justifyContent: 'space-between', mb:1, mx:1 }}>
                            <Button variant="contained" className="bg-danger" onClick={()=>handleCancelOrder(orderedCar?._id)}>Cancel</Button>
                            <Button disabled className={orderedCar?.status == 'pending' ? 'bg-warning' : 'bg-success'} style={{color:'whiteSmoke'}} variant="contained">{orderedCar?.status}</Button>
                        </Box>
                    </Card>
                </Grid>)}
            </Grid>
        </div>
    );
};

export default MyOrders;