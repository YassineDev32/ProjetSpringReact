import React, { useState, useEffect } from "react";
import { RiSteeringLine } from "react-icons/ri";
import { TbRoad } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { Link } from "react-router-dom";
import api from "../../api";

const MainSection = ({ filters = {}, isLoggedIn }) => {
  const [isGridView, setIsGridView] = useState(true);
  const [carData, setCarData] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Destructure filters with default values
  const {
    pickupDate = "",
    dropoffDate = "",
    priceRange = 2000, // Default price range
    carModel = "all", // Car model filter
    carMark = "all", // Car brand (mark) filter
  } = filters;

  // Fetch data from the backend whenever any filter changes
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        let url = "/api/cars/"; // Default URL for all cars

        if (pickupDate && dropoffDate) {
          // Fetch available cars if both dates are provided
          url = `/api/cars/available?startDate=${pickupDate}&endDate=${dropoffDate}`;
        }

        const response = await api.get(url); // Adjust the URL if necessary
        setCarData(response.data);
        setFilteredCars(response.data); // Initially, no filter is applied
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Unable to fetch car data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [pickupDate, dropoffDate, priceRange, carModel, carMark]); // Fetch data when any filter changes

  // Filter cars based on the price range and car brand
  useEffect(() => {
    const applyFilters = () => {
      let filtered = carData;

      // Apply price filter
      filtered = filtered.filter((car) => car.price <= priceRange);

      // Apply car mark filter (brand)
      if (carMark !== "all") {
        filtered = filtered.filter((car) => car.model.mark.name === carMark);
      }

      setFilteredCars(filtered);
    };

    applyFilters();
  }, [priceRange, carData, carMark]); // Apply filters when price range, car data, or car mark changes

  return (
    <div className="w-full flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-black font-bold">Cars</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-2 rounded ${
              isGridView ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            <i className="fa fa-th"></i>
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-2 rounded ${
              !isGridView ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            <i className="fa fa-list"></i>
          </button>
        </div>
      </div>

      <div
        className={`cars-container overflow-hidden ${
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            : "space-y-6"
        }`}
      >
        {[...filteredCars].reverse().map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-2xl p-6 flex flex-col justify-between hover:shadow-gray-400 transition duration-300"
          >
            <div className="relative w-full h-[220px] max-md:h-[300px] max-[500px]:h-[200px] overflow-hidden rounded-lg">
              <img
                className="object-cover"
                src={`data:image/png;base64,${car.image}`}
                alt={car.carName}
              />
              <div className="absolute top-4 right-4 text-red-500 cursor-pointer">
                <i className="fa-regular fa-heart text-2xl"></i>
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold truncate max-[500px]:text-xl text-black">
                {car.carName}
              </h3>
            </div>

            <div className="flex justify-around items-center mt-4 text-black">
              <div className="flex flex-col items-center">
                <RiSteeringLine className="w-6 h-6" />
                <p className="text-sm font-light">{car.fuelType}</p>
              </div>
              <div className="flex flex-col items-center">
                <TbRoad className="w-6 h-6" />
                <p className="text-sm font-light">
                  {car.airConditioning ? "Climat" : "No Climat"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <IoMdSpeedometer className="w-6 h-6" />
                <p className="text-sm font-light">
                  {car.manual ? "Manuel" : "Automatic"}
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-3xl text-gray-800 mb-5 font-bold">
                {car.price} MAD/Jour
              </p>
            </div>

            <Link
              to={`/cars/${car.id}?pickupDate=${filters.pickupDate}&dropoffDate=${filters.dropoffDate}`}
              className={`rounded-md text-center font-bold bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black ${
                !filters.pickupDate || !filters.dropoffDate
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={!filters.pickupDate || !filters.dropoffDate}
            >
              Voir Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
