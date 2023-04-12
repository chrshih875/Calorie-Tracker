import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './styles.css';

export const EditGoals = () => {

    return(
        <body>

            <div id='navigation'>
                <Link to="/home">Home</Link>
                <Link to="/fooddiary">Food Diary</Link>
                <Link to="/mygoals" id='home'>My Goals</Link>
            </div>

            <h2 id='h2'>Edit Your Nutrition Goals</h2>

            <form>
                <div id='body'>
                    <div id='daily_nutrition'>
                        <h3>Daily Nutrition Goals</h3>
                    </div>
                    <div id='daily_nutrition_goals'>
                        <div id='row'>
                            <label for='calories'><b>Calories</b></label>
                            <input type='number' name='calories'></input>
                        </div>
                        <div id='row'>
                            <label for='carbs'><b>Carbohydrates</b></label>
                            <input type='number' name='carbs'></input>
                        </div>
                        <div id='row'>
                            <label for='Fats'><b>Fats</b></label>
                            <input type='number' name='Fats'></input>
                        </div>
                        <div id='row'>
                            <label for='proteins'><b>Proteins</b></label>
                            <input type='number' name='proteins'></input>
                        </div>
                    </div>
                        <button type='submit' className='btn btn-secondary'>Submit</button>
                </div>
            </form>
        </body>
    );
}