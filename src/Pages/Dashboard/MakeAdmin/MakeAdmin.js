import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Button } from '@mui/material';

const MakeAdmin = () => {
    const [orderedSuccess, setOrderedSuccess] = useState(false);
    const [user, setUser] = useState('');

    const handleEmail = (e) =>{
        setUser(e.target.value);
        e.preventDefault();
    }

    const handleMakeAdmin = (e) =>{
        const email = {user};

        fetch('https://glacial-inlet-84612.herokuapp.com/users/admin',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(email)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount > 0){
                setOrderedSuccess(true);
            }
            setTimeout(function(){ setOrderedSuccess(false) }, 3000);
        })
        e.preventDefault();

    }
    
    return (
        <Box style={{display: 'flex',}}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >

      {/* success message */}
        {orderedSuccess && <Alert severity="success"><AlertTitle>Successfully Added Admin</AlertTitle></Alert>}

        {/* make admin input and button */}
        <TextField type="email" id="outlined-basic" onChange={handleEmail} label="Email" variant="outlined" />
        <Button style={{height: '57px', backgroundColor: 'green'}} variant="contained" onClick={handleMakeAdmin}>Add Admin</Button>
      </Box>
    );
};

export default MakeAdmin;