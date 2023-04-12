import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './styles.css';
import { useNavigate } from "react-router-dom";

export const FoodDiary = () => {
    const navigate =  useNavigate();

    const AddMeal = async (mealtime) => {
        console.log(mealtime)
        localStorage.setItem("Meal Time", mealtime);
        navigate("/foodapi");
    }

    return(
        <body>

            <div id='navigation'>
                <Link to="/home">Home</Link>
                <Link to="/fooddiary" id='home'>Food Diary</Link>
                <Link to="/mygoals">My Goals</Link>
            </div>

            <div id='body'>
                <div id='date'>
                    <label htmlFor="date">Your Food Diary htmlFor:</label>
                    <input type="date" name='date' id='date'></input>
                </div>

                <div id='food_entries'>
                    <div id='breakfast'>
                        <label htmlFor="breakfast">Breakfast:</label>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Breakfast")}>Add Food</button>
                    </div>
                    <div id='lunch'>
                        <label htmlFor="lunch">Lunch:</label>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Lunch")}>Add Food</button>
                    </div>
                    <div id='dinner'>
                        <label htmlFor="dinner">Dinner:</label>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Dinner")}>Add Food</button>
                    </div>
                    <div id='snacks'>
                        <label htmlFor="snacks">Snacks:</label>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Snacks")}>Add Food</button>
                    </div>
                </div>
            </div>
        </body>
    );
};
