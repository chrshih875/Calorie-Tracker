import { useState, useContext  } from 'react'
import axios from "axios";
// import { getAllFoods } from './calorieApiService'
import AuthContext from '../AuthContext';

function SearchFood(food) {
    const [foods, setFoods] = useState([])
    const [searchfoods, setSearchFoods] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    const { user, BASEURL } = useContext(AuthContext);

    const sendInfo = (foods) => {
        return axios(BASEURL + `/create/foodapi?food=${foods}`, {method: 'post', withCredentials: true})
        .then((response) => setSearchFoods(response.data.results));
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
            {/* <h1>{user.firstName}</h1> */}
            {searchfoods.map((food) => {
                const { title, id, image, nutrition, imageType } = food;

                return (
                <div className="w-25pct mb-md shadow rounded" key={id}>
                    <h2>{title}</h2>
                    <p>{id}</p>
                    <p>{imageType}</p>
                    <img src={image}></img>
                    <p><b>{nutrition.nutrients[0].name}</b> {nutrition.nutrients[0].amount} {nutrition.nutrients[0].unit}</p>
                    <p><b>{nutrition.nutrients[1].name}</b> {nutrition.nutrients[1].amount} {nutrition.nutrients[1].unit}</p>
                    <p><b>{nutrition.nutrients[2].name}</b> {nutrition.nutrients[2].amount} {nutrition.nutrients[2].unit}</p>
                    <p><b>{nutrition.nutrients[3].name}</b> {nutrition.nutrients[3].amount} {nutrition.nutrients[3].unit}</p>
                </div>
                );
            })}
        </div>
            </>
    );
}

export default SearchFood
