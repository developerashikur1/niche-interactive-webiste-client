import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Alert, AlertTitle } from '@mui/material';

const ManageOrders = () => {
    const [orderedSuccess, setOrderedSuccess] = useState(false);
    const [ordered, setOrdered]  = useState([]);
    const [statusValue, setStatusValue] = useState('');


    useEffect(() => {
        fetch('https://glacial-inlet-84612.herokuapp.com/orderedUsers')
        .then(res=>res.json())
        .then(data=>setOrdered(data))
    }, [])
    

    // delete orders handler
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
                    const balanceOrdered = ordered.filter(order=> order?._id !== id);
                    setOrdered(balanceOrdered)
                }
            })
        }
        else{
            alert('Thanks')
        }
    }

    
    const handleStatus = (e) =>{
        setStatusValue(e.target.value)
        e.preventDefault()
    }


    const handleButton = (id) =>{
        const added = {status: statusValue, id: id};
        fetch(`http://localhost:5000/orderedUsers/state`, {
            method: 'PUT',
            headers: {
                 'Content-Type' : 'application/json'
                },
            body: JSON.stringify(added)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                setOrderedSuccess(true)
            }
            setTimeout(function(){ setOrderedSuccess(false) }, 3000);
        })
        // console.log(id)
    }
    return (
       
        <Grid container spacing={2}>
        <Grid item xs={12}>
             <Typography variant="h4" sx={{mb:5}}>Manage All orders </Typography>

             {/* successfully alert */}
             <div sx={{width:'50%'}}>
             {orderedSuccess && <Alert severity="success"><AlertTitle >Status Updated Successfully</AlertTitle></Alert>}
             </div>
             {ordered.length===0 ? <CircularProgress color="success"/> :
             <TableContainer component={Paper}>
                <Table aria-label="simple table">

                {/* manage orders table header */}
                    <TableHead>
                    <TableRow>
                        <TableCell>Product Image</TableCell>
                        <TableCell align="left">Customer Name</TableCell>
                        <TableCell align="left">Car Name</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Cancel Order</TableCell>
                        <TableCell align="left">Status Update</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {ordered.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >


                        {/* manage orders table body */}
                        <TableCell component="th" scope="row">
                            <img src={row?.image} alt="" style={{width: '30%'}}/>
                        </TableCell>
                        <TableCell align="left">{row?.name}</TableCell>
                        <TableCell align="left">{row?.productName}</TableCell>
                        <TableCell align="left">{row?.price}</TableCell>
                        <TableCell align="left"><Button onClick={()=>handleCancelOrder(row?._id)} variant="contained" size="small" className="bg-danger" >Cancel</Button></TableCell>
                        <TableCell align="left">


                        {/* <form onClick={handleSubmitStatus}> */}
                        <Box style={{display: 'flex'}}>
                            <select onChange={handleStatus} variant="standard" name="status">
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                            </select>
                            <Button size="small" style={{borderRadius:0}} onClick={()=>handleButton(row._id)} variant="contained" >Update</Button>
                        </Box>
                        
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </Grid>
        </Grid>
   
    );
};

export default ManageOrders;