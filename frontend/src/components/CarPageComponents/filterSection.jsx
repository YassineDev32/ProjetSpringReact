import React, { useState } from "react";
import CarPhoto from "../../assets/car1.png";

const FilterSection = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [priceRange, setPriceRange] = useState(500); 
  const [carModel, setCarModel] = useState("all");

  const resetFilters = () => {
    setPickupDate("");
    setDropoffDate("");
    setPriceRange(500);
    setCarModel("all");
  };

  const carModels = [
    { name: "Golf", value: "Golf", img: CarPhoto },
    { name: "Dacia", value: "Dacia", img: CarPhoto },
    { name: "Renault", value: "Renault", img: CarPhoto },
  ];

  return (
    <div className="w-full lg:w-1/4 p-8 bg-white rounded-lg shadow-gray-400 shadow-lg space-y-8" style={{height:"800px"}}>
      <h1 className="text-2xl font-bold text-gray-800">Filter Cars</h1>

      {/* Booking Time */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Booking Time</h2>
        <label className="block text-gray-600">Pick-up Date</label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-black"
        />
        <label className="block text-gray-600">Drop-off Date</label>
        <input
          type="date"
          value={dropoffDate}
          onChange={(e) => setDropoffDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-black"
        />
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Price Range</h2>
        <input
          type="range"
          min={250}
          max={1500}
          step={10}
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full"
        />
        <span className="block text-gray-600">Up to {priceRange} MAD</span>
      </div>

      {/* Car Models */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Car Models</h2>
        <div className="flex flex-wrap gap-4">
          {carModels.map((model) => (
            <button
              key={model.value}
              onClick={() => setCarModel(model.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition 
              ${carModel === model.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <img
                src={model.img}
                alt={model.name}
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-black">{model.name}</span>
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
