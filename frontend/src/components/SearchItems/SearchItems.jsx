import React, { useContext } from 'react'
import './SearchItems.css'
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../Fooditem/FoodItem.jsx'

const SearchItems = () => {
    
    
    const { state } = useLocation();
     const query = state && state.query ? state.query : "";

    // console.log(state);
    // let category="All";
   

    const {food_list} = useContext(StoreContext)

    return (
      <div className='food-display' id='food-display'>
       
        <div className="food-display-list">
        { query === "" ? <></> :   
         (food_list.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
            .map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            )) 
        )}
        </div>
  
      </div>
  )
}

export default SearchItems
