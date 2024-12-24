import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api.js";

const DetailsCar = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [marks, setMarks] = useState([]); // Assuming you fetch car marks
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/cars/${carId}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });

    // Fetch car marks (example, adapt it to your API)
    api
      .get("/api/marks/")
      .then((response) => setMarks(response.data))
      .catch((error) => console.error("Error fetching marks:", error));
  }, [carId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleSaveChanges = () => {
    api
      .put(`/api/cars/${carId}`, car)
      .then((response) => {
        navigate("/admin/vehicule");
      })
      .catch((error) => {
        console.error("Error updating car details:", error);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Handle image upload logic here, for now just log the file
    console.log(file);
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="mt-[100px] text-black bg-white rounded-lg shadow-lg px-8 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Car Details</h2>
      <form>
        {/* General Information */}
        <details className="mb-6">
          <summary className="text-lg font-medium cursor-pointer text-blue-600 hover:text-blue-700 transition-all">
            General Information
          </summary>
          <div className="mt-4">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Matricule
              </label>
              <input
                type="text"
                name="matricule"
                value={car.matricule}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={car.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </details>

        {/* Specifications */}
        <details className="mb-6">
          <summary className="text-lg font-medium cursor-pointer text-blue-600 hover:text-blue-700 transition-all">
            Specifications
          </summary>
          <div className="mt-4">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={car.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Seats
              </label>
              <input
                type="number"
                name="seats"
                value={car.seats}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </details>

        {/* Features */}
        <details className="mb-6">
          <summary className="text-lg font-medium cursor-pointer text-blue-600 hover:text-blue-700 transition-all">
            Features
          </summary>
          <div className="mt-4">
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="airConditioning"
                checked={car.airConditioning}
                onChange={(e) =>
                  setCar({ ...car, airConditioning: e.target.checked })
                }
                className="mr-3"
              />
              <label className="text-gray-700 font-medium">
                Air Conditioning
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={car.fuelType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="DIESEL">Diesel</option>
                <option value="ESSENCE">Essence</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>
        </details>

        {/* Status */}
        <details className="mb-6">
          <summary className="text-lg font-medium cursor-pointer text-blue-600 hover:text-blue-700 transition-all">
            Status
          </summary>
          <div className="mt-4">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Car Status
              </label>
              <select
                name="status"
                value={car.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="RESERVED">Reserved</option>
                <option value="AVAILABLE">Available</option>
                <option value="ENENTRETIEN">En Entretien</option>
              </select>
            </div>
          </div>
        </details>

        {/* Brand and Photo */}
        <details className="mb-6">
          <summary className="text-lg font-medium cursor-pointer text-blue-600 hover:text-blue-700 transition-all">
            Photo
          </summary>
          <div className="mt-4">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </details>

        {/* Submit Button */}
        <div className="flex justify-end gap-6 mt-6">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="py-3 px-8 rounded-full bg-blue-500 text-white text-lg font-medium hover:bg-blue-700 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsCar;
