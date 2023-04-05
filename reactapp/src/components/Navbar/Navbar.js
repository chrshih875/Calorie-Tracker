import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import './styles.css';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import AuthContext from '../../AuthContext';

export const Navbar = () => {
    const cookies = new Cookies();
    // const [ user, setUser ] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImNocmlzQGdtYWlsLmNvbSIsIlVzZXJJZCI6IjEiLCJGaXJzdE5hbWUiOiJjaHJpcyIsIkxhc3ROYW1lIjoic2hpaCIsImV4cCI6MTY4MDIxMTk5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.1_xvSXZTRCILXhOMxkCZB7VI7mzSmtlVmEZah8_XWo8';
    const token1 = cookies.get('token');
    const decoded = jwt_decode( token )
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);


    // const logout = () => {
    //     localStorage.clear();

    //     cookies.remove()

    //     navigate( '/auth' );

    //     setUser( null )
    // };

    const loggingOut = () => {
        console.log("hello")
        logout();
        console.log(user.firstName)
        // window.location.reload(false);
    }

    const signin = () => {
        navigate( '/auth' );
    }

    // useEffect( () => {

    //     setUser( JSON.parse( localStorage.getItem( 'userProfile' ) ) )
        

    // }, [location] );

    return(
        <body>
            <div id='nav-bar'>
                <div id='nav-left'>
                    <h1>MyCalorieTracker</h1>
                </div>
                <div id='nav-right'>
                    {user ? ( <p>Hi, {user.firstName}</p>) : (<p>Welcome, Please Sign In! </p>)}
                    <p>|</p>
                    <p>Settings</p>
                    <p>|</p>
                    {user ? ( <p onClick={ loggingOut } style={{cursor:'pointer'}}>Logout</p> ) : (<p onClick={ signin } style={{cursor:'pointer'}}> Sign In</p>)}
                </div>
            </div>

            {/* <div id='navigation'>
                <Link to="/home" id='home'>Home</Link>
                <Link to="/fooddiary">Food Diary</Link>
                <Link to="/mygoals">My Goals</Link>
            </div> */}
        </body>
    );
};
