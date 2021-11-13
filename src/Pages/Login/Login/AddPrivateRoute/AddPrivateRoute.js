import { CircularProgress } from '@mui/material';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../Contexts/useAuth';

const AddPrivateRoute = ({children, ...rest}) => {
    const {admin,user, loading} = useAuth();

    if(admin===false){
        return <CircularProgress/>
}
    return (
        <Route
        {...rest}
        render={({location})=>
            admin ? 
            children
            :
            <Redirect
            to={{
                pathname:"/",
                state:{from:location}
            }}
            ></Redirect>
        }
        ></Route>
    );
};

export default AddPrivateRoute;