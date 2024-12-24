import React, { useState } from "react";
import FilterSection from "../components/CarPageComponents/filterSection";
import MainSection from "../components/CarPageComponents/MainSection";

const CarList = () => {
  // Manage state for filters
  const [filters, setFilters] = useState({
    pickupDate: "",
    dropoffDate: "",
    priceRange: 500,
    carModel: "all",
  });

  return (
    <section className="dark:bg-gray-100 py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Pass setFilters to FilterSection */}
          <FilterSection setFilters={setFilters} />
          {/* Pass filters to MainSection */}
          <MainSection filters={filters} />
        </div>
      </div>
    </section>
  );
};

export default CarList;
