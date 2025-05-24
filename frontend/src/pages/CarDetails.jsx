import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "../components/UI/BookingForm";
import Helmet from "../components/UI/Helmet";
import api from "../api";
import {
  DirectionsCar,
  Settings,
  LocalGasStation,
  AcUnit,
  EventSeat,
  Star,
  Speed,
  CalendarToday,
  ArrowBack,
  LocationOn,
  AttachMoney,
  Check,
} from "@mui/icons-material";

const CarDetails = ({ isLoggedIn }) => {
  const location = useLocation();
  const { carId } = useParams();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  const car = cars.find((c) => c.id === parseInt(carId));

  const searchParams = new URLSearchParams(location.search);
  const pickupDate = searchParams.get("pickupDate");
  const dropoffDate = searchParams.get("dropoffDate");

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

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        try {
          const response = await api.get("/user/me");
          setUserData(response.data);
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
      };
      fetchUserData();
    }
  }, [isLoggedIn]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!car) return <ErrorMessage message="Car not found" />;

  return (
    <Helmet title={`${car.matricule} - ${car.model}`}>
      <div className="bg-gray-100 min-h-screen">
        <main className="w-auto mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-lg overflow-hidden"
          >
            {/* Back button bar */}
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white p-4 border-b border-gray-200"
            >
              <motion.button
                onClick={() => window.history.back()}
                className="group flex items-center text-black hover:text-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="mr-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowBack />
                </motion.div>
                <span className="text-black font-bold relative">
                  Back to car list
                  <motion.span
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.button>
            </motion.div>

            <div className="md:flex">
              {/* Image Section */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="md:w-2/5 lg:w-1/3"
              >
                <div className="relative h-64 md:h-full">
                  <img
                    src={`data:image/png;base64,${car.image}`}
                    alt={car.model.name}
                    className="w-full p-10 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
              </motion.div>

              {/* Car Details Section */}
              <div className="md:w-3/5 lg:w-2/3 p-8">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {car.model.name + " " + car.model.mark.name}
                    </h2>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" />
                      <span className="text-gray-600 font-semibold">4.9 (120 reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-6">
                    <LocationOn className="mr-2 text-blue-600" />
                    <span>Available in Casablanca</span>
                  </div>

                  <p className="text-gray-600 mb-8">{car.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                    <FeatureItem icon={<DirectionsCar />} label={`${car.seats} Seats`} />
                    <FeatureItem icon={<Settings />} label={car.manual ? "Manual" : "Automatic"} />
                    <FeatureItem icon={<LocalGasStation />} label={car.fuelType} />
                    <FeatureItem icon={<AcUnit />} label={car.airConditioning ? "AC" : "No AC"} />
                    <FeatureItem icon={<Speed />} label="Cruise Control" />
                    <FeatureItem icon={<EventSeat />} label="Leather Seats" />
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-xl font-semibold mb-4">Pricing</h3>
                    <div className="flex items-center gap-20">
                      <div className="flex items-center">
                        <AttachMoney className="text-green-600 mr-2" />
                        <span className="text-3xl font-bold text-gray-900">{car.price}</span>
                        <span className="text-gray-600 ml-2">MAD/day</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CalendarToday className="mr-2" />
                        <span>Free cancellation</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Additional Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-8 bg-gray-50"
            >
              <h3 className="text-2xl font-semibold mb-6">Additional Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <Feature label="Bluetooth" />
                <Feature label="Navigation System" />
                <Feature label="Backup Camera" />
                <Feature label="USB Ports" />
                <Feature label="Keyless Entry" />
                <Feature label="Child Seat Compatible" />
                <Feature label="Sunroof" />
                <Feature label="Apple CarPlay" />
              </div>
            </motion.div>

            {/* Booking Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="p-8"
            >
              <h3 className="text-2xl font-semibold mb-6">Book This Car</h3>
              <BookingForm
                pickupDate={pickupDate}
                dropoffDate={dropoffDate}
                userData={userData}
                carId={carId}
                isLoggedIn={isLoggedIn}
              />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </Helmet>
  );
};

const FeatureItem = ({ icon, label }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-3"
  >
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>
    </div>
    <div className="text-sm font-medium text-gray-900">{label}</div>
  </motion.div>
);

const Feature = ({ label }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-2 text-gray-600"
  >
    <Check className="h-5 w-5 text-green-500" />
    <span className="text-sm">{label}</span>
  </motion.div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
    />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" 
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </motion.div>
  </div>
);

export default CarDetails;

