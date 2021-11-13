import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button} from '@mui/material';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import Pay from '../Pay/Pay';
import DashboardHome from '../DashboardHome/DashboardHome';
import MyOrders from '../MyOrders/MyOrders';
import LeftReview from '../LeftReview/LeftReview';
import ManageOrders from '../ManageOrders/ManageOrders';
import AddProduct from '../AddProduct/AddProduct';
import useAuth from '../../Contexts/useAuth';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import ManageProducts from '../ManageProducts/ManageProducts';
import AddPrivateRoute from '../../Login/Login/AddPrivateRoute/AddPrivateRoute';

const drawerWidth = 240;

const Dashboard = (props) => {
    const {logInOut, admin} = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    

    const drawer = (
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'flex-start', marginLeft:'25px'}}>
          <Toolbar />
          <Divider />
          {/* everybody can see */}
          <Link style={{textDecoration: 'none'}} to="/home"><Button>Go Home</Button></Link>
          <Link style={{textDecoration: 'none'}} to={`${url}`}><Button>Dashboard</Button></Link>

          {/* {!admin ? */}
           {!admin && <>
          <Link style={{textDecoration: 'none'}} to={`${url}/pay`}><Button>Pay</Button></Link>
          <Link style={{textDecoration: 'none'}} to={`${url}/myOrders`}><Button>My Orders</Button></Link>
          <Link style={{textDecoration: 'none'}} to={`${url}/leftReview`}><Button>Left Review</Button></Link>
          </>}
            {/* : */}
          {/* <> */}
          {admin &&
          <>
          <Link style={{textDecoration: 'none'}} to={`${url}/manageOrders`}><Button>Manage All Orders</Button></Link>
          <Link style={{textDecoration: 'none'}} to={`${url}/addProduct`}><Button>Add a Product</Button></Link>
          <Link style={{textDecoration: 'none'}} to={`${url}/makeAdmin`}><Button>Make Admin</Button></Link>
          <Link style={{textDecoration: 'none'}} to={`${url}/manageProducts`}><Button>Manage Products</Button></Link>
          </>}
          {/* </>} */}


          {/* everybody can see*/}
          <Link style={{textDecoration: 'none'}} to={"/login"}><Button onClick={logInOut}>Log Out</Button></Link>
        </div>
      );
    
      const container = window !== undefined ? () => window().document.body : undefined;
    return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />


      {/* admin protected private routes */}
        <Box>
            <Switch>
                <Route exact path={path}>
                  <DashboardHome></DashboardHome>
                </Route>
                <Route path={`${path}/pay`}>
                  <Pay></Pay>
                </Route>
                <Route path={`${path}/myOrders`}>
                  <MyOrders></MyOrders>
                </Route>
                <Route path={`${path}/leftReview`}>
                  <LeftReview></LeftReview>
                </Route>
                <AddPrivateRoute path={`${path}/manageOrders`}>
                  <ManageOrders></ManageOrders>
                </AddPrivateRoute>
                <AddPrivateRoute path={`${path}/addProduct`}>
                  <AddProduct></AddProduct>
                </AddPrivateRoute>
                <AddPrivateRoute path={`${path}/makeAdmin`}>
                  <MakeAdmin></MakeAdmin>
                </AddPrivateRoute>
                <AddPrivateRoute path={`${path}/manageProducts`}>
                  <ManageProducts></ManageProducts>
                </AddPrivateRoute>
            </Switch>
        </Box>
    </Box>
  </Box>
    );
};



Dashboard.propTypes = {
    window: PropTypes.func,
  };
  

export default Dashboard;