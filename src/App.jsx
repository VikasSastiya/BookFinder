import React, { useEffect, useState } from "react";
import RestaurantCard from "../src/components/RestaurantCard";

const App = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "/api/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    let restaurants = [];
    json?.data?.cards?.forEach((card) => {
      const resList =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (resList) {
        restaurants.push(...resList);
      }
    });

    setListOfRestaurant(restaurants);
    setFilteredRestaurant(restaurants);
  };

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setFilteredRestaurant(listOfRestaurant);
    } else {
      const filtered = listOfRestaurant.filter((res) =>
        res.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRestaurant(filtered);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Box */}
      <div className="flex rounded-lg border-2 border-blue-500 overflow-hidden max-w-md mx-auto mb-6">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search Something..."
          className="w-full outline-none bg-white text-gray-700 text-sm px-4 py-3"
        />
        <button
          onClick={handleSearch}
          type="button"
          className="flex items-center justify-center bg-blue-600 px-5 hover:bg-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="18"
            className="fill-white"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </button>
      </div>

      {/* Restaurant List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredRestaurant.map((item, index) => (
          <RestaurantCard key={`${item.info.id}-${index}`} resData={item} />
        ))}
      </div>
    </div>
  );
};

export default App;
