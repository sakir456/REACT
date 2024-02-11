import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/mapi/homepage/getCards?lat=21.7033128&lng=72.9992777"
    );

    const json = await data.json();
    console.log(json)
    console.log(json.data.success.cards[1].gridWidget.gridElements.infoWithStyle.restaurants

      )
  
    // Optional Chaining
    setListOfRestraunt(json.data.success.cards[1].gridWidget.gridElements.infoWithStyle.restaurants);
    setFilteredRestaurant(json.data.success.cards[1].gridWidget.gridElements.infoWithStyle.restaurants);
  };

  const onlineStatus = useOnlineStatus();
  
  if(onlineStatus===false)
  return (
         <h1>
          Looks like you're offline!! please check your internet connection
         </h1>


    );




  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // Filter the restraunt cards and update the UI
              // searchText
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
        <Link
         key={restaurant.info.id}
         to={"/restaurants/" + restaurant.info.id }>
        <RestaurantCard  resData={restaurant} />
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;