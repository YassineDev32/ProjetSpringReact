import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import Helmet from "../components/UI/Helmet";
import api from "../api";
import {
  DirectionsCar,
  Settings,
  Speed,
  Room,
  EventSeat,
  Star,
} from "@mui/icons-material";

const CarDetails = () => {
  const { carId } = useParams();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const car = cars.find((c) => c.id === parseInt(carId));

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/api/cars/");
        setCars(response.data);
      } catch (err) {
        setError("Unable to fetch car data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <Helmet title={`${car.matricule} - ${car.model}`}>
      <section className="flex justify-center items-center">
        <div className="container mx-auto px-8 bg-white rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex justify-center items-center">
              <img
                src={`data:image/png;base64,${car.image}`}
                alt="#"
                className="w-3/4 rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                {car.model.name +" "+car.model.mark.name}
              </h2>
              <div className="flex items-center justify-start gap-10 mb-6">
                <h6 className="text-3xl font-semibold text-green-600">
                  {car.price} MAD/Jour
                </h6>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 flex">
                    {Array(5).fill(null).map((_, idx) => (
                      <Star key={idx} className="text-yellow-500" />
                    ))}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-8">{car.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: <DirectionsCar className="text-blue-600 text-2xl" />,
                    label: `Seats: ${car.seats}`,
                  },
                  {
                    icon: <Settings className="text-blue-600 text-2xl" />,
                    label: car.manual ? "Manual" : "Automatic",
                  },
                  {
                    icon: <Speed className="text-blue-600 text-2xl" />,
                    label: `Fuel: ${car.fuelType}`,
                  },
                  {
                    icon: <Room className="text-blue-600 text-2xl" />,
                    label: car.airConditioning ? "AC Available" : "No AC",
                  },
                  {
                    icon: <EventSeat className="text-blue-600 text-2xl" />,
                    label: `Status: ${car.status}`,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-gray-800"
                  >
                    {item.icon}
                    <span className="text-lg font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 px-5 lg:px-20">
            <div>
              <h5 className="text-2xl font-bold mb-6 text-blue-900">
                Booking Information
              </h5>
              <BookingForm />
            </div>
            <div>
              <h5 className="text-2xl font-bold mb-6 text-blue-900">
                Payment Information
              </h5>
              <PaymentMethod />
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default CarDetails;
