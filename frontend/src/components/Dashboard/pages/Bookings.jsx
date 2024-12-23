import React from "react";

import carData from "../../../assets/dummy-data/booking-cars.js";
import CarItem from "../UI/CarItem";

const Bookings = () => {
  return (
    <div className="mt-[100px] px-[30px] pb-[50px]">
      <div className="booking__wrapper">
        {/* Booking Title */}
        <h2 className="text-white text-[1.5rem] mb-[2rem]">Booking</h2>

        {/* Filter Widget */}
        <div className="flex items-center gap-[1.5rem]">
          <div className="filter__widget-01">
            <select className="border-none py-[7px] px-[20px] rounded-full bg-primary-color text-black cursor-pointer mb-[2rem]">
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          <div className="filter__widget-01">
            <select className="border-none py-[7px] px-[20px] rounded-full bg-primary-color text-black cursor-pointer mb-[2rem]">
              <option value="toyota">Toyota</option>
              <option value="bmw">Bmw</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>

        {/* Car List */}
        <div className="grid grid-cols-4 gap-[2rem]">
          {carData?.map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
