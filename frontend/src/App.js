import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton
  , List, ListItem, ListItemText, Drawer, Avatar, Badge, InputBase, Menu, MenuItem} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);

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

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/books"><MenuItem style={{color: "rgba(0, 0, 0, 0.87)"}} onClick={handleMenuClose}>Manage Books</MenuItem></Link>
      <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
    </Menu>
  );

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
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                          />
                        </div>
                    <Link to={userInfo ? "/cart" : "/signin"}>
                    <IconButton className={classes.navBtn} style={{marginRight: "20px"}}><Badge badgeContent={cartItems.length > 0 ? cartItems.length : null} color="secondary"><ShoppingCartIcon /></Badge></IconButton></Link>
                    {userInfo ? (<IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="account-menu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                          ><Avatar className={classes.round}>{userInfo.name.slice(0,1).toUpperCase()}</Avatar></IconButton>):
                          <Link to='/signin'><Button color="inherit" className={classes.navBtn}>LOGIN</Button></Link>}
                  </Toolbar>
                </AppBar>
                {renderMenu}
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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default App;
