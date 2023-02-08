import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
// import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner'
import { Link } from 'react-router-dom'
import { getAllFoods } from '../../services/calorieApiService';

export const Foods = () => {
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        getAllFoods()
            .then((data) => {
                setFoods(data.results)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            {/* {
                isLoading && <LoadingSpinner />
            } */}
            <div className="flex-col align-items-center text-center">
                <h1>Food</h1>
                {foods.map((food) => {
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
    )
}
