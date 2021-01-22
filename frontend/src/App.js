import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton
  , List, ListItem, ListItemText, Drawer, Avatar, Badge} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import BooksManagement from './components/BooksManagement';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import Signin from './components/Signin';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';

function App() {
  const [open, setOpen] = useState(false);
  const userSignin = useSelector(state => state.userSignin);
  const userRegister = useSelector(state => state.userRegister);
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart
  const {userInfo} =  userSignin.userInfo ? userSignin : userRegister;
  const classes = useStyles();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  }

  

  const list = () => <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h5" style={{margin: "10px 10px 0px"}} className={classes.title}>
          Browse Genres
      </Typography>
    <List>
      {['Fantasy', 'Action', 'Sci-fi'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>

  return (
      <BrowserRouter>
      <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
                <AppBar position="static" color="primary" position="fixed">
                  <Toolbar>
                    <IconButton edge="start" color="inherit" className={classes.menuButton} aria-label="menu">
                      <div><MenuIcon onClick={toggleDrawer(true)}/>
                      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
                          {list()}
                      </Drawer>
                      </div>
                    </IconButton>
                    <Link to="/" className ={classes.title}><Typography variant="h6" className="brand-logo">
                      BookShop
                    </Typography></Link>
                    <Link to={userInfo ? "/cart" : "/signin"}>
                    <IconButton className={classes.navBtn} style={{marginRight: "20px"}}><Badge badgeContent={cartItems.length > 0 ? cartItems.length : null} color="secondary"><ShoppingCartIcon /></Badge></IconButton></Link>
                    {userInfo ? (<Link to= "/books"><Avatar className={classes.round}>{userInfo.name.slice(0,1).toUpperCase()}</Avatar></Link>):
                          <Link to='/signin'><Button color="inherit" className={classes.navBtn}>LOGIN</Button></Link>}
                  </Toolbar>
                </AppBar>
              </div>
                  <div style={{marginTop: "100px"}}>
                    <Route path="/books" component={BooksManagement} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/register" component={Register} />
                    <Route path="/book/:id" component={BookDetails} />
                    <Route path="/cart/:id?"  component={Cart} />
                    <Route path="/shipping"  component={Shipping} />
                    <Route path="/payment"  component={Payment} />
                    <Route path="/placeorder"  component={PlaceOrder} />
                    <Route path="/" exact component={Home} />
                  </div>
      </MuiThemeProvider>
      </BrowserRouter>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238'
    }
  },
  typography: {
    "fontFamily": `'Manrope', "Yusei Magic", "Helvetica", "Arial", sans-serif`,
    "color": '#263238'
   }
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  round: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  navBtn: {
    color: "white"
  }
}));

export default App;
