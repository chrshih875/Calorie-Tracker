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
    const navigate =  useNavigate();

    const AddMeal = async (mealtime) => {
        localStorage.setItem("Meal Time", mealtime);
        navigate("/foodapi");
    }

    useEffect(() => {
        FilterMeals();
        console.log("meal", mealList);
    }, []);

    const FilterMeals = () => {
        axios.get(BASEURL + "/getall/foodinput/react", { withCredentials: true })
        .then(
            (response) => setmealList(response.data));
            console.log("meal", mealList)
    }
    // const mealRows = ["Breakfast", "Lunch", "Dinner", "Snacks"]

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
            </div>

                {/* <div id='food_entries'>
                    <div id='breakfast'>
                        <label htmlFor="breakfast">Breakfast:</label>
                    </div>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Breakfast")}>Add Food</button>
                    <div id='lunch'>
                        <label htmlFor="lunch">Lunch:</label>
                    </div>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Lunch")}>Add Food</button>
                    <div id='dinner'>
                        <label htmlFor="dinner">Dinner:</label>
                    </div>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Dinner")}>Add Food</button>
                    <div id='snacks'>
                        <label htmlFor="snacks">Snacks:</label>
                    </div>
                        <button className='btn btn-secondary' onClick={() => AddMeal("Snacks")}>Add Food</button>
                </div> */}

                {/* <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th scope='col'>Calories</th>
                            <th scope='col'>Carbs</th>
                            <th scope='col'>Fat</th>
                            <th scope='col'>Protein</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>Breakfast</th>
                            {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Breakfast").map(filterMeals =>
                                <>
                                    <td>{filterMeals.calorie}</td>
                                    <td>{filterMeals.carb}</td>
                                    <td>{filterMeals.fat}</td>
                                    <td>{filterMeals.protein}</td>
                                </>
                                )
                            }
                        </tr>
                            <button className='btn btn-secondary' onClick={() => FilterMeals("Breakfast")}>Add Food</button>
                    </tbody>
                </table> */}
                <table className="table table-striped table-dark">
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Food Name</th>
                            <th scope="col" >Calories (kcal)</th>
                            <th scope="col" >Carbs (g)</th>
                            <th scope="col">Fat (g)</th>
                            <th scope="col">Protein (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr> */}
                            {/* <div className='d-flex flex-column'> */}
                                    <th scope="row" className='thead-light'>Breakfast</th>
                            {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Breakfast").map((filterMeals) => {
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
                            {/* </div> */}
                                <button onClick={() => AddMeal("Breakfast")} className='btn btn-secondary' style={{cursor:'pointer'}}>Add Food</button>
                        {/* </tr> */}
                        {/* <tr> */}
                            {/* <div className='d-flex flex-column'> */}
                                <th scope="row">Lunch</th>
                                {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Lunch").map((filterMeals) => {
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
                                <p onClick={() => AddMeal("Lunch")} className='btn btn-secondary' style={{cursor:'pointer'}}>Add Food</p>
                            {/* </div> */}
                        {/* </tr> */}
                        {/* <tr> */}
                            {/* <div className='d-flex flex-column'> */}
                                <th scope="row">Dinner</th>
                                {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Dinner").map((filterMeals) => {
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
                                <p onClick={() => AddMeal("Dinner")} className='btn btn-secondary' style={{cursor:'pointer'}}>Add Food</p>
                            {/* </div> */}
                        {/* </tr> */}
                        {/* <tr> */}
                            {/* <div className='d-flex flex-column'> */}
                                <th scope="row">Snacks</th>
                                {
                                mealList.filter(meal => meal.userId === user.userId && meal.mealTime === "Snacks").map((filterMeals) => {
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
                                <p onClick={() => AddMeal("Snacks")} className='btn btn-secondary' style={{cursor:'pointer'}}>Add Food</p>
                            {/* </div> */}
                        {/* </tr> */}
                    </tbody>
                </table>
        </body>
    );
};
