import { useState } from 'react'
import { getAllFoods } from './calorieApiService'

function SearchFood(food) {
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const sendInfo = async (foodinput) => {
        getAllFoods(foods).then((data) => {
            setFoods(data.results)
            console.log(foods)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
        <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(event) => setFoods(event.target.value)} />
            <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
            </span>
            <button type="button" className="btn btn-primary" onClick={(e) => sendInfo(foods)} >
                <i className="fas fa-search"></i>
            </button>
        </div>
        </>
    )
};

export default SearchFood
