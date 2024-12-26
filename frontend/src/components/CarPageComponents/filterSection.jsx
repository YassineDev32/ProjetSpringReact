import React, { useState, useEffect } from "react";
import CarPhoto from "../../assets/car1.png"; // Example image
import api from "../../api";

const FilterSection = ({ setFilters }) => {
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [carMark, setCarMark] = useState("all");
  const [carMarks, setCarMarks] = useState([]);

  // Reset filters to default values
  const resetFilters = () => {
    setPickupDate("");
    setDropoffDate("");
    setPriceRange(1500);
    setCarMark("all");
    setFilters({ pickupDate: "", dropoffDate: "", priceRange: 1500, carMark: "all" });
  };

  // Fetch car marks from the backend
  useEffect(() => {
    const fetchCarMarks = async () => {
      try {
        const response = await api.get("/api/marks/"); // Adjust the API endpoint accordingly
        setCarMarks(response.data);
      } catch (error) {
        console.error("Error fetching car marks:", error);
      }
    };

    fetchCarMarks();
  }, []);

  // Handle filter changes
  const handleFilterChange = () => {
    setFilters({ pickupDate, dropoffDate, priceRange, carMark });
  };

  // Handle date form submission
  const handleDateSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    handleFilterChange(); // Call filter change when the user submits the form
  };

  // Handle car mark selection
  const handleMarkChange = (mark) => {
    setCarMark(mark); // Update the selected mark
    setFilters({ pickupDate, dropoffDate, priceRange, carMark: mark }); // Apply the filter
  };

  return (
    <div className="w-full lg:w-1/4 p-8 bg-white rounded-lg shadow-gray-400 shadow-lg space-y-8" style={{ height: "800px" }}>
      <h1 className="text-2xl font-bold text-gray-800">Filter Cars</h1>

      {/* Date Picker Form */}
      <form className="space-y-4" onSubmit={handleDateSubmit}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Booking Time</h2>
          <label className="block text-gray-600">Pick-up Date</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
          />
          <label className="block text-gray-600">Drop-off Date</label>
          <input
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
          />
        </div>

        {/* Search Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-lg transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Price Range */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Price Range</h2>
        <input
          type="range"
          min={250}
          max={2500}
          step={10}
          value={priceRange}
          onChange={(e) => {
            setPriceRange(e.target.value);
            handleFilterChange(); // Update filters on price change
          }}
          className="w-full"
        />
        <span className="block text-gray-600">Up to {priceRange} MAD</span>
      </div>

      {/* Car Marks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Car Marks</h2>
        <div className="flex flex-wrap gap-4">
          {carMarks.map((mark) => (
            <button
              key={mark.value}
              onClick={() => handleMarkChange(mark.name)} // Call handleMarkChange when clicked
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${carMark === mark.name ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              <img src={CarPhoto} alt={mark.name} className="w-8 h-8 object-contain" />
              <span className="font-semibold text-black">{mark.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center mt-6">
        <button
          onClick={resetFilters}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-lg transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
