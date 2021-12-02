import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import'./Navbar.css';
import {Button} from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button,setButton] = useState(true);

    const showButton = () => {
        if(window.innerWidth <=960){
            setButton(false)
        }
        else{
            setButton(true);
        }
    };

    useEffect(() =>{
        showButton();

    }, []);

    window.addEventListener('resize', showButton);
    return (
        <>
          <nav className = "navbar">
            <div className = "navbar-container">
                <Link to="/" className = "navbar-logo" onClick={closeMobileMenu}>
                HobbyBank <i class="fas fa-basketball-ball"></i>
                </Link>
                <div className ='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                    <li className = 'nav-item'>
                        <Link to='/collection' className = 'nav-links' onClick = {closeMobileMenu}>
                         Collection
                        </Link>
                    </li>
                    <li className = 'nav-item'>
                        <Link to='/favorites' className = 'nav-links' onClick = {closeMobileMenu}>
                         Favorites
                        </Link>
                    </li>
                    <li className = 'nav-item'>
                        <Link to='/watch-list' className = 'nav-links' onClick = {closeMobileMenu}>
                         Watch List
                        </Link>
                    </li>
                   
                </ul>
                {button && <Button buttonStyle ='btn--outline'> SIGN UP</Button>}
            </div>    
          </nav>  
        </>
    )
}

export default Navbar

