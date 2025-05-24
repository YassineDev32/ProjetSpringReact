import React, { useState, useEffect } from "react";
import SingleCard from "../reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../UI/RecommendCarCard";

import recommendCarsData from "../../../assets/dummy-data/recommendCars";
import api from "../../../api";

const Dashboard = () => {
  const [carCount, setCarCount] = useState(0);
  const [carRentedMonthly, setCarRentedMonthly] = useState(0);

  // Fetch total cars count
  useEffect(() => {
    const fetchCarCount = async () => {
      try {
        const responseCars = await api.get("/api/cars/count");
        const responseReservationMontly = await api.get("/api/reservations/rented/count");
        setCarCount(responseCars.data);
        setCarRentedMonthly(responseReservationMontly.data);
      } catch (error) {
        console.error("Error fetching car count:", error);
      }
    };

    fetchCarCount();
  }, []);

  // Card objects
  const carObj = {
    title: "Total de Voitures",
    totalNumber: carCount, // Use the fetched car count here
    icon: "ri-police-car-line",
  };

  const tripObj = {
    title: "Mensuel Reservation",
    totalNumber: carRentedMonthly,
    icon: "ri-steering-2-line",
  };

  const clientObj = {
    title: "Clients Mensuel",
    totalNumber: "85k",
    icon: "ri-user-line",
  };

  const distanceObj = {
    title: "Kilometers Daily",
    totalNumber: 2167,
    icon: "ri-timer-flash-line",
  };

  return (
    <div className="mt-[100px] px-[30px] pb-[50px]">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-[2rem]">
        <SingleCard item={carObj} />
        <SingleCard item={tripObj} />
        <SingleCard item={clientObj} />
        <SingleCard item={distanceObj} />
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 gap-[2rem] mt-[2rem]">
        <div className="bg-[#181b3a] p-[30px] rounded-[5px] h-[320px] pb-[50px]">
          <h3 className="text-white text-[1.2rem] font-[500] mb-[20px]">Miles Statistics</h3>
          <MileChart />
        </div>

        <div className="bg-[#181b3a] p-[30px] rounded-[5px] h-[320px] pb-[50px]">
          <h3 className="text-white text-[1.2rem] font-[500] mb-[20px]">Car Statistics</h3>
          <CarStatsChart />
        </div>
      </div>

      {/* Recommended Cars Section */}
      <div className="grid grid-cols-3 gap-[2rem] mt-[2rem]">
        {recommendCarsData.map((item) => (
          <RecommendCarCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
