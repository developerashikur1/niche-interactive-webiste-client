import * as React from 'react';
import Grid from '@mui/material/Grid';
import useAuth from '../../Contexts/useAuth';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const extraBoss = {
    height:"60px",
    width:"60px",
     borderRadius:'100%', 
     boxShadow:'1px 1px 6px grey',
     border:'3px solid gold',
}
const DashboardHome = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const {user} = useAuth();


    return (
        <div>
           <Grid container spacing={2}>

           {/* users profile */}
  <Grid item xs={12} md={4}>

  <Card sx={{ minWidth: 275, boxShadow: 3 }}>
      <CardContent>
      <img style={extraBoss} src={user?.photoURL || 'https://i.ibb.co/ZSMBFC1/images.png'} alt=""/>
        <Typography variant="h5" component="div"  sx={{pt:2}}>
        {user?.displayName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user?.email}
        </Typography>
        <Typography variant="body2">
        If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. -Oprah Winfrey
         
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  </Grid>


  {/* accordion about users */}
  <Grid item xs={12} md={8}>
  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Whats your abilities
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{user?.providerId}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
           Your Log in history
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{user?.providerId}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {user?.metadata?.lastSignInTime}
          </Typography>
        </AccordionDetails>
      </Accordion>
  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
           Your Register in history
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{user?.providerId}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {user?.metadata?.creationTime}
          </Typography>
        </AccordionDetails>
      </Accordion>
  </Grid>
</Grid>
        </div>
    );
};

export default DashboardHome;