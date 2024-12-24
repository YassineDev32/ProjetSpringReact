import React from "react";

const RapportFilter = ({ filters, onFilterChange }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col">
        <label htmlFor="sort" className="text-gray-600">
          Trier Par Date
        </label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-md w-full"
        >
          <option value="">Aucun</option>
          <option value="recent">Plus récent</option>
          <option value="oldest">Plus ancien</option>
        </select>
      </div>
    </div>
  );
};

export default RapportFilter;
