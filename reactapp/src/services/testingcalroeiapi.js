import { useState, useContext  } from 'react'
import axios from "axios";
import AuthContext from '../AuthContext';
import { useNavigate } from "react-router-dom";

function SearchFood() {
    const initialState = { FoodName: '', Calorie: '', Protein: '', Carb: '', Fat: '', Servings: '', MealTime: '', UserId: '' };
    const [foods, setFoods] = useState([])
    const [searchfoods, setSearchFoods] = useState([])
    const [counter, setCounter] = useState(0);
    const { user, BASEURL } = useContext(AuthContext);
    const navigate =  useNavigate();

    const sendInfo = (foods) => {
        return axios(BASEURL + `/create/foodapi?food=${foods}`, {method: 'post', withCredentials: true})
        .then((response) => setSearchFoods(response.data.results));
    }

    const increase = () => {
    setCounter(count => count + 1);
    };

    const decrease = () => {
    setCounter(count => count - 1);
    };

    const AddFood = (food) => {
        initialState.FoodName = food.title;
        initialState.Servings = counter.toString();
        initialState.Calorie =(food.nutrition.nutrients[0].amount * initialState.Servings).toString();
        initialState.Protein = (food.nutrition.nutrients[1].amount * initialState.Servings).toString();
        initialState.Fat = (food.nutrition.nutrients[2].amount * initialState.Servings).toString();
        initialState.Carb = (food.nutrition.nutrients[3].amount * initialState.Servings).toString();
        initialState.UserId = user.userId;
        initialState.MealTime = localStorage.getItem("Meal Time");
        console.log(initialState);
        axios.post(BASEURL + "/create/foodinput", initialState, { withCredentials: true })
        navigate("/fooddiary")
    }

    return (
        <>
        <div className="input-group rounded">
        <form id="search-for-food-input">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(event => setFoods(event.target.value))}/>
            <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
            </span>
            <button type="button" className="btn btn-primary" onClick={(e) => sendInfo(foods)} >
                <i className="fas fa-search">Search Food</i>
            </button>
        </form>
        </div>
        <div className="flex-col align-items-center text-center">
            <h1>Food</h1>
            {searchfoods.map((food) => {
                const { title, id, image, nutrition, imageType } = food;
                return (
                <>
                <div className="w-25pct mb-md shadow rounded" key={id}>
                    <h2>{title}</h2>
                    <img src={image}></img>
                    <p><b>{nutrition.nutrients[0].name}</b> {nutrition.nutrients[0].amount} {nutrition.nutrients[0].unit}</p>
                    <p><b>{nutrition.nutrients[1].name}</b> {nutrition.nutrients[1].amount} {nutrition.nutrients[1].unit}</p>
                    <p><b>{nutrition.nutrients[2].name}</b> {nutrition.nutrients[2].amount} {nutrition.nutrients[2].unit}</p>
                    <p><b>{nutrition.nutrients[3].name}</b> {nutrition.nutrients[3].amount} {nutrition.nutrients[3].unit}</p>
                    <p><b>Servings</b> {counter}</p>
                    <button type="button" onClick={decrease}>-</button>
                    <button type="button" onClick={increase}>+</button>
                    <button type="button" onClick={() => AddFood(food)}>Add!</button>
                </div>
                </>
                );
            })}
        </div>
            </>
    );
}

export default SearchFood
