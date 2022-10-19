import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/about">About</Link>
                <Link to="/">Shop</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/orders">Orders</Link>
                {
                    user?.uid ?
                        <button onClick={logOut} style={{margin:'10px'}}>Log Out</button>
                        :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">SignUp</Link>
                        </>
                }
            </div>
        </nav>
    );
};

export default Header;