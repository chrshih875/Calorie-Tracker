import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './styles.css';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../AuthContext';

export const FoodDiary = () => {
    const { user, BASEURL } = useContext(AuthContext);
    const [ mealList, setmealList ] = useState([]);
    const [ todayDate, settodayDate ] = useState(new Date().toISOString().split('T')[0]);
    const navigate =  useNavigate();

    const AddMeal = async (mealtime) => {
        localStorage.setItem("Meal Time", mealtime);
        localStorage.setItem("Date Input", todayDate);
        navigate("/foodapi");
    }

    useEffect(() => {
        FilterMeals();
    }, []);

    const FilterMeals = () => {
        axios.get(BASEURL + "/getall/foodinput/react", { withCredentials: true })
        .then(
            (response) => setmealList(response.data));
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
                    <input type="date" name='date' id='date' value={todayDate} onChange={(event => settodayDate(event.target.value))}></input>
                </div>
            </div>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th></th>
                            <th scope="col">Food Name</th>
                            <th scope="col" >Calories (kcal)</th>
                            <th scope="col" >Carbs (g)</th>
                            <th scope="col">Fat (g)</th>
                            <th scope="col">Protein (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                            <th scope="row" className='text-info'>Breakfast</th>
                            </tr>
                            {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Breakfast" && meal.dateInput.split('T')[0] === todayDate).map((filterMeals) => {
                                    return (
                                        <>
                                <tr key={filterMeals.foodInputId}>
                                <td></td>
                                    <td>{filterMeals.foodName}</td>
                                    <td>{filterMeals.calorie}</td>
                                    <td>{filterMeals.carb}</td>
                                    <td>{filterMeals.fat}</td>
                                    <td>{filterMeals.protein}</td>
                                </tr>
                                </>
                                );
                            })
                            }
                                <button onClick={() => AddMeal("Breakfast")} className='btn btn-info' style={{cursor:'pointer'}}>Add Food</button>
                                <tr>
                                    <th scope="row" className='text-info'>Lunch</th>
                                </tr>
                            {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Lunch" && meal.dateInput.split('T')[0] === todayDate).map((filterMeals) => {
                                    return (
                                        <>
                                <tr key={filterMeals.foodInputId}>
                                <td></td>
                                    <td>{filterMeals.foodName}</td>
                                    <td>{filterMeals.calorie}</td>
                                    <td>{filterMeals.carb}</td>
                                    <td>{filterMeals.fat}</td>
                                    <td>{filterMeals.protein}</td>
                                </tr>
                                </>
                                );
                            })
                            }
                                <button onClick={() => AddMeal("Lunch")} className='btn btn-info' style={{cursor:'pointer'}}>Add Food</button>
                                <tr>
                                    <th scope="row" className='text-info'>Dinner</th>
                                </tr>
                            {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Dinner" && meal.dateInput.split('T')[0] === todayDate).map((filterMeals) => {
                                    return (
                                        <>
                                <tr key={filterMeals.foodInputId}>
                                <td></td>
                                    <td>{filterMeals.foodName}</td>
                                    <td>{filterMeals.calorie}</td>
                                    <td>{filterMeals.carb}</td>
                                    <td>{filterMeals.fat}</td>
                                    <td>{filterMeals.protein}</td>
                                </tr>
                                </>
                                );
                            })
                            }
                                <button onClick={() => AddMeal("Dinner")} className='btn btn-info' style={{cursor:'pointer'}}>Add Food</button>
                                <tr>
                                    <th scope="row" className='text-info'>Snacks</th>
                                </tr>
                            {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Snacks" && meal.dateInput.split('T')[0] === todayDate).map((filterMeals) => {
                                    return (
                                        <>
                                <tr key={filterMeals.foodInputId}>
                                <td></td>
                                    <td>{filterMeals.foodName}</td>
                                    <td>{filterMeals.calorie}</td>
                                    <td>{filterMeals.carb}</td>
                                    <td>{filterMeals.fat}</td>
                                    <td>{filterMeals.protein}</td>
                                </tr>
                                </>
                                );
                            })
                            }
                                <button onClick={() => AddMeal("Snacks")} className='btn btn-info' style={{cursor:'pointer'}}>Add Food</button>
                    </tbody>
                </table>

        </body>
    );
};
