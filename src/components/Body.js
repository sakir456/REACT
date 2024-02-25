import RestaurantCard,{ withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  // console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/mapi/homepage/getCards?lat=21.7033128&lng=72.9992777"
    );

    const json = await data.json();
    console.log(json)
    console.log(json.data.success.cards[1].gridWidget.gridElements.infoWithStyle.restaurants)
  
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

const {loggedInUser, setUserName }= useContext(UserContext)


return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4 ">
          
          <input
            type="text"
             data-testid="searchInput"
            className=" border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className=" px-4 py-1 bg-green-100 m-4 rounded-lg"
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
        <div className="m-3 p-2 flex items-center">
            <button
          className="filter-btn px-4 py-2 bg-gray-100 rounded-lg"
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
         <div className="m-3 p-2 flex items-center">
          <label>userName : </label>
          <input
             className="border border-black p-2"
             value={loggedInUser}
             onChange={(e) => setUserName(e.target.value)}
                />
               </div>
               </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
        <Link
         key={restaurant.info.id}
         to={"/restaurants/" + restaurant.info.id }>
          {restaurant.info.promoted ? (
            <RestaurantCardPromoted resData={restaurant} />
          ) :(
            <RestaurantCard  resData={restaurant} />
          )}
       </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;