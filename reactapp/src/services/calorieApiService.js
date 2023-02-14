import axios from "axios";
import React, { useState } from 'react';

export default function GetAllFoods() {
    const [food, setFood] = useState("")

    const handleSubmit = async(submit) => {
        submit.preventDefault()
        const http = axios.create({
            baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
            params: {
                query: food,
                minCarbs: '10',
                maxCarbs: '100',
                minProtein: '10',
                maxProtein: '100',
                minCalories: '50',
                maxCalories: '800',
                minFat: '10',
                maxFat: '100',
            },
            headers: {
                'X-RapidAPI-Key': 'ce488d6175mshd2b44358611a4acp18b00ejsne323d1f14bf7',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        })
        const res = await http.get()
        console.log(res.data)
        return res.data
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a New Food</h1>
                    <form id="add-food" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input placeholder="Food" required type="text" name="Food" value={food} onChange={(event) => setFood(event.target.value)} id="food" className="form-control" />
                        </div>
                        <h6>Food</h6>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
