import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import './styles.css';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";


export const Home = () => {
    const cookies = new Cookies();
    const [ user, setUser ] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImNocmlzQGdtYWlsLmNvbSIsIlVzZXJJZCI6IjEiLCJGaXJzdE5hbWUiOiJjaHJpcyIsIkxhc3ROYW1lIjoic2hpaCIsImV4cCI6MTY4MDIxMTk5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.1_xvSXZTRCILXhOMxkCZB7VI7mzSmtlVmEZah8_XWo8';
    const token1 = cookies.get('token');
    const decoded = jwt_decode( token )
    const navigate = useNavigate();
    const location = useLocation();


    const logout = () => {
        localStorage.clear();

        navigate( '/auth' );

        setUser( null )
    };
    
    useEffect( () => {
        if( user == null ){
            setUser( decoded )
        }
        console.log( token1 )
        console.log( 'JWT TOKEN:', cookies.getAll( 'token' ) )


    }, [location] );


    return(
        <body>
            <div id='nav-bar'>
                <div id='nav-left'>
                    <h1>MyCalorieTracker</h1>
                </div>
                <div id='nav-right'>
                    {user ? ( <p>Hi, {user.FirstName}</p>) : (<p>Welcome!</p>)}
                    <p>|</p>
                    <p>Settings</p>
                    <p>|</p>
                    <p onClick={ logout }>Logout</p>
                </div>
            </div>

            <div id='navigation'>
                <Link to="/home" id='home'>Home</Link>
                <Link to="/fooddiary">Food Diary</Link>
                <Link to="/mygoals">My Goals</Link>
            </div>

            <div id='body'>
                
                <div id='daily_summary'>
                    <h3>Your Daily Summary</h3>

                    <div id='calories_remaining'>
                        <div id='cal_left'>
                            <p>Calories Remaining:</p>
                            <p id='calories'>2000</p>
                        </div>
                        <button className='btn btn-secondary'>Add Food</button>
                    </div>

                    <div id='summary'>
                        <div id='goal'>
                            <p>2000</p>
                            <p>Goal</p>
                        </div>
                        <div id='food'>
                            <p>0</p>
                            <p>Food</p>
                        </div>
                    </div>
                </div>

            </div>
        </body>
    )
};