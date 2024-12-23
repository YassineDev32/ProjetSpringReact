import React, { useState, useEffect } from "react";
import CarItem from "../UI/CarItem";
import api from "../../../api.js";

const Bookings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMark, setSelectedMark] = useState(null);
  const [marks, setMarks] = useState([]);
  const [carData, setCarData] = useState([]);
  const [newCar, setNewCar] = useState({
    matricule: "",
    description: "",
    price: "",
    status:"AVAILABLE",
    seats: "",
    manual: false,
    airConditioning: false,
    fuelType: "DIESEL",
    modelId: null,
    image: null,
  });
  useEffect(() => {
    api
      .get("/api/cars/") // Replace with your actual API endpoint
      .then((response) => {
        setCarData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Car:", error);
      });
  }, []);
  useEffect(() => {
    api
      .get("/api/marks/") // Replace with your actual API endpoint
      .then((response) => {
        setMarks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching marks:", error);
      });
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCar({
      ...newCar,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleMarkChange = (e) => {
    const selectedMarkId = parseInt(e.target.value, 10);
    const mark = marks.find((m) => m.id === selectedMarkId);
    setSelectedMark(mark || null);
    setNewCar({ ...newCar, modelId: null }); // Reset model when mark changes
  };

  const handleAddCar = () => {
    api
      .post("/api/cars/add", newCar) // Replace with your actual API endpoint
      .then((response) => {
        setCarData((prevData) => [...prevData, response.data]); // Append the new car to the list
        setIsModalOpen(false);
        setNewCar({
          matricule: "",
          description: "",
          price: "",
          seats: "",
          status: "AVAILABLE",
          manual: false,
          airConditioning: false,
          fuelType: "DIESEL",
          modelId: "",
          image: "",
        });
        setSelectedMark(null); // Reset selected mark
      })
      .catch((error) => {
        console.error("Error adding car:", error);
      });
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCar({ ...newCar, image: reader.result.split(",")[1] }); // Base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-[100px] px-[30px] pb-[50px]">
      <div className="booking__wrapper">
        {/* Booking Title */}
        <h2 className="text-white text-[1.5rem] mb-[2rem]">Voitures</h2>

        {/* Filter Widget */}
        <div className="flex items-center justify-between mb-[2rem]">
          <div className="flex items-center gap-[1.5rem]">
            <div className="filter__widget-01">
              <select className="border-none py-[7px] px-[20px] rounded-full bg-primary-color text-black cursor-pointer">
                <option value="New">New</option>
                <option value="Popular">Popular</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            <div className="filter__widget-01">
              <select className="border-none py-[7px] px-[20px] rounded-full bg-primary-color text-black cursor-pointer">
                <option value="toyota">Toyota</option>
                <option value="bmw">Bmw</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>

          {/* Add Car Button */}
          <button
            onClick={handleOpenModal}
            className="py-[7px] px-[20px] rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          >
            Ajouter Voiture
          </button>
        </div>

        {/* Car List */}
        <div className="grid grid-cols-4 gap-[2rem]">
          {carData?.map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex text-black items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6 text-center text-black">
              Ajouter Nouvelle Voiture
            </h3>
            <form>
              {/* General Information */}
              <details className="mb-4">
                <summary className="text-lg font-medium cursor-pointer text-blue-600">
                  General Information
                </summary>
                <div className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Matricule
                    </label>
                    <input
                      type="text"
                      name="matricule"
                      value={newCar.matricule}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newCar.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </details>

              {/* Specifications */}
              <details className="mb-4">
                <summary className="text-lg font-medium cursor-pointer text-blue-600">
                  Specifications
                </summary>
                <div className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Prix
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newCar.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Place
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={newCar.seats}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      name="manual"
                      checked={newCar.manual}
                      onChange={(e) =>
                        setNewCar({ ...newCar, manual: e.target.checked })
                      }
                      className="mr-2"
                    />
                    <label className="text-gray-700 font-medium">Manual</label>
                  </div>
                </div>
              </details>

              {/* Features */}
              <details className="mb-4">
                <summary className="text-lg font-medium cursor-pointer text-blue-600">
                  Caractéristiques
                </summary>
                <div className="mt-4">
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      name="airConditioning"
                      checked={newCar.airConditioning}
                      onChange={(e) =>
                        setNewCar({
                          ...newCar,
                          airConditioning: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <label className="text-gray-700 font-medium">
                      Climatisation
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Type Carburant
                    </label>
                    <select
                      name="fuelType"
                      value={newCar.fuelType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="DIESEL">Diesel</option>
                      <option value="ESSENCE">ESSENCE</option>
                      <option value="HYBRID">HYBRID</option>
                    </select>
                  </div>
                </div>
              </details>

              {/* Model and Image */}
              <details className="mb-4">
                <summary className="text-lg font-medium cursor-pointer text-blue-600">
                  Marque and Photo
                </summary>
                <div className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Marque
                    </label>
                    <select
                      name="markId"
                      value={selectedMark?.id || ""}
                      onChange={handleMarkChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select a Mark</option>
                      {marks.map((mark) => (
                        <option key={mark.id} value={mark.id}>
                          {mark.name}
                        </option>
                      ))}
                    </select>

                    {/* Select Model if Mark is Selected */}
                    {selectedMark && (
                      <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Modèle
                        </label>
                        <select
                          name="modelId"
                          value={newCar.modelId || ""}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="">Select a Model</option>
                          {selectedMark.models.map((model) => (
                            <option key={model.id} value={model.id}>
                              {model.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </details>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="py-2 px-4 rounded-full bg-gray-400 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCar}
                  className="py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
