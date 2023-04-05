import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './styles.css';

export const MyGoals = () => {

    return(
        <body>

            <div id='navigation'>
                <Link to="/home">Home</Link>
                <Link to="/fooddiary">Food Diary</Link>
                <Link to="/mygoals" id='home'>My Goals</Link>
            </div>

            <div id='body'>
                <div id="daily_nutrition">
                    <h3>Daily Nutrition Goals</h3>
                    <Link to="/editgoals" className='btn btn-secondary'>EDIT</Link>
                </div>
                <div id='daily_nutrition_goals'>
                    <div id='row'>
                        <b>Calories</b>
                        <p>2810</p> {/*enter user calories here*/}
                    </div>
                    <div id='row'>
                        <p><b>Carbohydrates</b> 342g</p>
                        <p>50%</p>
                    </div>
                    <div id='row'>
                        <p><b>Fats</b> 94g</p>
                        <p>30%</p>
                    </div>
                    <div id='row'>
                        <p><b>Protein</b> 141g</p>
                        <p>20%</p>
                    </div>
                </div>
            </div>
        </body>
    )
}