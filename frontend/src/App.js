import React, { useState, useEffect } from 'react';

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
    <div className="gridContainer">
    <header className="header navbar-fixed">
        <nav>
            <div className="nav-wrapper">
                <button onClick={openMenu}>
                    &#9776;
                </button>
              <a href="#" className="brand-logo">BookShop</a>
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
        <ul className="products">
              <li>
                    <div className="product">
                        <img className="product-image" src="/images/d1.jpg" alt="product"/>
                        <div className="product-name"> 
                            <a href="product.html">Harry Potter and the Philosopoher's Stone</a>
                        </div>
                        <div className="product-author">by J.K. Rowling</div>
                        <div className="product-type">Paperback</div>
                        <div className="product-price">$15</div>
                        <div className="product-rating">4.5 Stars (15 Reviews)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image" src="/images/d1.jpg" alt="product"/>
                        <div className="product-name"> 
                            <a href="product.html">Harry Potter and the Philosopoher's Stone</a>
                        </div>
                        <div className="product-author">by J.K. Rowling</div>
                        <div className="product-type">Paperback</div>
                        <div className="product-price">$15</div>
                        <div className="product-rating">4.5 Stars (15 Reviews)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image" src="/images/d1.jpg" alt="product"/>
                        <div className="product-name"> 
                            <a href="product.html">Harry Potter and the Philosopoher's Stone</a>
                        </div>
                        <div className="product-author">by J.K. Rowling</div>
                        <div className="product-type">Paperback</div>
                        <div className="product-price">$15</div>
                        <div className="product-rating">4.5 Stars (15 Reviews)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image" src="/images/d1.jpg" alt="product"/>
                        <div className="product-name"> 
                            <a href="product.html">Harry Potter and the Philosopoher's Stone</a>
                        </div>
                        <div className="product-author">by J.K. Rowling</div>
                        <div className="product-type">Paperback</div>
                        <div className="product-price">$15</div>
                        <div className="product-rating">4.5 Stars (15 Reviews)</div>
                    </div>
                </li>
                <li>
                    <div className="product">
                        <img className="product-image" src="/images/d1.jpg" alt="product"/>
                        <div className="product-name"> 
                            <a href="product.html">Harry Potter and the Philosopoher's Stone</a>
                        </div>
                        <div className="product-author">by J.K. Rowling</div>
                        <div className="product-type">Paperback</div>
                        <div className="product-price">$15</div>
                        <div className="product-rating">4.5 Stars (15 Reviews)</div>
                    </div>
                </li>
            </ul>
        </div> 
    </main>
    <footer className="page-footer">
        <div>
            All rights reserved
        </div>
    </footer>
</div>
  );
}

export default App;
