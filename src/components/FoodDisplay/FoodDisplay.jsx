import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/Storecontext';
import FoodItem from '../FoodItem/FoodItem';

export const FoodDisplay = ({ category }) => { // Destructure the category prop
    const { food_list } = useContext(StoreContext);

    return (
        <div className="food-display" id='food_Display'>
            <h2>Top dishes near you</h2>

            <div className="food-display-list">
                {food_list.map((item, index) => {
                    console.log(category, item.category);
                    
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        );
                    }
                    return null; // Ensure that map doesn't return undefined if the condition isn't met
                })}
            </div>
        </div>
    );
};