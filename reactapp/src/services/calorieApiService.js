import axios from "axios";

const http = axios.create({
    baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
        query: 'Butter Chicken Curry',
        // titleMatch: 'Butter Chicken Curry',
        sort: 'calories',
        sortDirection: 'asc',
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
        'X-RapidAPI-Key': 'ce65a0c3e6msh5da3f26677f4ee9p1dd016jsn062c4ed2ecc5',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
})

export const getAllFoods = async () => {
    const res = await http.get()
    return res.data
}

