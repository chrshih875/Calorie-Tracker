import axios from "axios";

const http = axios.create({
    baseURL: "https://api.spacexdata.com/v4",
    // headers: {
    //     'X-RapidAPI-Key': 'ce65a0c3e6msh5da3f26677f4ee9p1dd016jsn062c4ed2ecc5',
    //     'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    // }
})

export const getAllLaunches = async () => {
    const res = await http.get(`/launches`)
    return res.data
}

export const getOneLaunch = async (id) => {
    const res = await http.get(`/launches/${id}`)
    return res.data
}





