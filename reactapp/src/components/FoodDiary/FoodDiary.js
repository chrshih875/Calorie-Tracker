import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './styles.css';

export const FoodDiary = () => {

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
                <Link to="/home">Home</Link>
                <Link to="/fooddiary" id='home'>Food Diary</Link>
                <Link to="/mygoals">My Goals</Link>
            </div>

            <div id='body'>
                <div id='date'>
                    <label for="date">Your Food Diary For:</label>
                    <input type="date" name='date' id='date'></input>
                </div>

                <div id='food_entries'>
                    <div id='breakfast'>
                        <label for="breakfast">Breakfast:</label>
                        <button className='btn btn-secondary'>Add Food</button>
                    </div>
                    <div id='lunch'>
                        <label for="lunch">Lunch:</label>
                        <button className='btn btn-secondary'>Add Food</button>
                    </div>
                    <div id='dinner'>
                        <label for="dinner">Dinner:</label>
                        <button className='btn btn-secondary'>Add Food</button>
                    </div>
                    <div id='snacks'>
                        <label for="snacks">Snacks:</label>
                        <button className='btn btn-secondary'>Add Food</button>
                    </div>
                </div>
            </div>
        </body>
    );
};