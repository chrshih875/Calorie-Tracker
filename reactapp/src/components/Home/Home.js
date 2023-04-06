import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import './styles.css';


export const Home = () => {
    // const navigate = useNavigate();
    // const location = useLocation();



    return(
        <body>

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
