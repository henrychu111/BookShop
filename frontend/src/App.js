import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import BookScreen from './Screens/BookScreen';
import CartScreen from './Screens/CartScreen';

function App() {
  function openMenu(){
    if(!document.querySelector(".sidebar").classList.contains("open")){
      document.querySelector(".sidebar").classList.add("open")
      document.querySelector(".overlay").classList.add("enabled")
    } else {
      document.querySelector(".overlay").classList.remove("enabled")
      document.querySelector(".sidebar").classList.remove("open")
    }
  }
  function closeMenu(){
    document.querySelector(".sidebar").classList.remove("open")
    document.querySelector(".overlay").classList.remove("enabled")
}

  useEffect(() => {
      document.querySelector(".main").addEventListener("click", function() {
        if(document.querySelector(".sidebar").classList.contains("open")) {
          document.querySelector(".sidebar").classList.remove("open")
          document.querySelector(".overlay").classList.remove("enabled")
        }
      })
  }, [])
  return (
<BrowserRouter>
    <div className="gridContainer">
    <header className="header navbar-fixed">
        <nav>
            <div className="nav-wrapper">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/" className ="brand-logo">BookShop</Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/">Cart</a></li>
                <li><a href="/">Sign in</a></li>
              </ul>
            </div>
          </nav>
    </header>
    <aside className="sidebar">
        <h3>Browse Genres</h3>
        <button className="sidebar-close-button" onClick={closeMenu}><i className="material-icons">cancel</i></button>
        <ul>
            <li className="genres">
                <a href="index.html">Fantasy</a>
            </li>
            <li className="genres">
                <a href="index.html">Action</a>
            </li>
            <li className="genres">
                <a href="index.html">Sci-Fi</a>
            </li>
        </ul>
    </aside>
    <main className="main">
        <div className="overlay"></div>
        <div className="content">
            <Route path="/book/:id" component={BookScreen} />
            <Route path="/cart/:id?"  component={CartScreen} />
            <Route path="/" exact component={HomeScreen} />
        </div> 
    </main>
    <footer className="page-footer">
        <div>
            All rights reserved
        </div>
    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
