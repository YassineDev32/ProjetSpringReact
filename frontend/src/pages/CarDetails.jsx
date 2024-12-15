import React, { useEffect } from "react";
import carData from "../assets/data/carData";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import Helmet from "../components/UI/Helmet";
import {
  DirectionsCar,
  Settings,
  Speed,
  Room,
  EventSeat,
  Business,
  Star,
} from "@mui/icons-material";

const CarDetails = () => {
  const { carId } = useParams();

  const singleCarItem = carData.find((car) => car.id === parseInt(carId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <Helmet title={singleCarItem.carName}>
      <section className="flex justify-center items-center">
        <div className="container mx-auto px-8 bg-white rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex justify-center items-center">
              <img
                src={singleCarItem.imgUrl}
                alt={singleCarItem.carName}
                className="w-3/4 rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                {singleCarItem.carName}
              </h2>
              <div className="flex items-center justify-start gap-10 mb-6">
                <h6 className="text-3xl font-semibold text-green-600">
                  {singleCarItem.price}.00 MAD/Jour
                </h6>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 flex">
                    {Array(5)
                      .fill(null)
                      .map((_, idx) => (
                        <Star key={idx} className="text-yellow-500" />
                      ))}
                  </span>
                  <span className="text-gray-600">
                    ({singleCarItem.rating} ratings)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-8">
                {singleCarItem.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: <DirectionsCar className="text-blue-600 text-2xl" />,
                    label: `${singleCarItem.model}`,
                  },
                  {
                    icon: <Settings className="text-blue-600 text-2xl" />,
                    label: `${singleCarItem.automatic}`,
                  },
                  {
                    icon: <Speed className="text-blue-600 text-2xl" />,
                    label: `${singleCarItem.speed}`,
                  },
                  {
                    icon: <Room className="text-blue-600 text-2xl" />,
                    label: `${singleCarItem.gps}`,
                  },
                  {
                    icon: <EventSeat className="text-blue-600 text-2xl" />,
                    label: `${singleCarItem.seatType}`,
                  },
                  {
                    icon: <Business className="text-blue-600 text-2xl" />,
                    label: `${singleCarItem.brand}`,
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
