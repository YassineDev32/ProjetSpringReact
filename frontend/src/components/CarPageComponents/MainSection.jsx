import React, { useState } from "react";
import { RiSteeringLine } from "react-icons/ri";
import { TbRoad } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import carData from "../../assets/data/carData";
import { Link } from "react-router-dom";

const MainSection = () => {
  const [isGridView, setIsGridView] = useState(true); // State to track the view mode
  const isButton = true;

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
          isButton
            ? "h-auto max-lg:h-[250vh] max-md:h-[300vh]"
            : "min-h-[500vh]"
        }`}
      >
        <div
          className={
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {carData.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-2xl p-6 flex flex-col justify-between hover:shadow-gray-400 transition duration-300"
            >
              <div className="relative w-full h-[220px] max-md:h-[300px] max-[500px]:h-[200px] overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  src={car.imgUrl}
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
                  <p className="text-sm font-light">{car.model}</p>
                </div>
                <div className="flex flex-col items-center">
                  <TbRoad className="w-6 h-6" />
                  <p className="text-sm font-light">{car.speed}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IoMdSpeedometer className="w-6 h-6" />
                  <p className="text-sm font-light">{car.automatic}</p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xl font-bold text-gray-800">
                  {car.price} MAD/Jour
                </p>
              </div>

              <Link to={`/cars/${car.id}`} className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black">
                Voir Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
