import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';


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




export default function Pricing() {
  const classes = useStyles();

  const [products ,setProducts] = React.useState([]);
  const [cartitems , setCartitems] = React.useState([]);
  const [numofitems , setNumofitems] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  
  
    useEffect(() => {
      axios.get('http://localhost:4200/products')
      .then(response => {
        setProducts(response.data);
        console.log("products",response);
    });
    }, []);   


   

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Shoe Mart
          </Typography>
          <nav>
          <Badge badgeContent={numofitems} color="primary">
            <Link href="/cart" className={classes.link}>
              <Button variant="outlined" onClick={()=>{
                var cartstring = JSON.stringify(cartitems);
                var pricestring = price.toString();
                localStorage.setItem("cart",cartstring);
                localStorage.setItem("price",pricestring);

              }}>
                Cart
                </Button>
            </Link>
          
      </Badge>
          </nav>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}


      <Container maxWidth="md" component="main">
        <Grid container spacing={1} alignItems="flex-end">

          {products.map((product) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={product.title}

                />
                <CardContent>
                  <div >
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${product.price}
                    </Typography>
                    
                  </div>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center" >
                        {product.description}
                      </Typography>
                    
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary" onClick={()=> {
                     var list = cartitems;
                     var prices = price;
                     var newprice = prices+product.price;
                     var newitem = { "title" : product.title, "price" : product.price}
                     setPrice(newprice);
                     list.push(newitem);
                     setCartitems(list);
                     setNumofitems(list.length)
                     console.log("click",cartitems.length);
                     console.log("cart",cartitems);
                  }} >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
     
    </React.Fragment>
  );
}