import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));



export default function Cart() {
  const classes = useStyles();
 
   const [items, setItems] = useState([]);
   const [price, setPrice] = useState(0);


  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("cart")));
    setPrice((localStorage.getItem("price")));
}, []);

  return (
      <React.Fragment>
          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>

            <nav>
            <Link variant="button" color="textPrimary" href="/home" className={classes.link}>
              Back to Home
            </Link>
          </nav>
          <Typography component="h1" variant="h5">
          Total price -- $ {price}
        </Typography>
        <Button variant="contained" color="primary" onClick = { ()=>{
          var orders = {
            "customername" : localStorage.getItem("username"),
            "orderitems" : localStorage.getItem("cart"),
            "price" : localStorage.getItem("price")
          }
          axios.post('http://localhost:4200/orders',orders)
             .then(response => {
               console.log("orders",response);
           });
          alert("MAKE payment .. in a secure way, Thankyou wist again");
        }}>
          Proceed to buy
        </Button>
          </Toolbar>
        </AppBar>
          <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
          Cart items
        </Typography>
          {items.map((item) =>(
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="body1" component="p">
                    Product name - {item.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    price -  {item.price}
                  </Typography>
                </CardContent>
              </Card>
    
            ))}
            </Container>
      </React.Fragment>

  );
}