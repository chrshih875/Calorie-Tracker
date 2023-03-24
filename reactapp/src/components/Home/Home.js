import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './styles.css';

export const Home = () => {



    return(
        <body>
            <div id='nav-bar'>
                <div id='nav-left'>
                    <h1>MyCalorieTracker</h1>
                </div>
                <div id='nav-right'>
                    <p>Hi, User</p>
                    <p>|</p>
                    <p>Settings</p>
                    <p>|</p>
                    <p>Logout</p>
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