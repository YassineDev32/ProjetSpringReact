import React from "react";
import sellCar from "../../../assets/images/sell-car.png";
import TrackingChart from "../charts/TrackingChart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const SellCar = () => {
  const percentage = 55;
  const percentage02 = 45;
  return (
    <div className="mt-24 px-8 pb-12">
  <div className="bg-gray-800 p-6 rounded-md text-white">
    <h2 className="text-2xl font-medium mb-8">Sell Cars</h2>
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-primary p-6 rounded-md text-left cursor-pointer">
        <h2 className="text-gray-100 mb-4">2022 Mercedes Benz</h2>
        <img src={sellCar} alt="" className="object-cover w-3/4 mx-auto" />
      </div>

      <div className="bg-primary p-6 rounded-md cursor-pointer h-96">
        <h3 className="text-gray-100 text-lg font-light mb-8">Tracking History</h3>
        <TrackingChart />
      </div>
    </div>

    <div className="mt-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-white">Offers</h2>
        <div>
          <select className="bg-gray-700 text-white p-2 rounded-md">
            <option value="toyota">Toyota</option>
            <option value="bmw">Bmw</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>

      <div className="space-y-8">
        {[1, 2].map((_, index) => (
          <div key={index} className="bg-primary p-6 rounded-md grid grid-cols-5 gap-8">
            <div>
              <h3 className="text-lg text-gray-100 font-light mb-2">Killian James</h3>
              <h6 className="text-orange-500 text-lg mb-1">$16,605 <span className="text-gray-400 text-sm">average price</span></h6>
              <h6 className="text-gray-400 text-sm mb-4">Market average is $16,244</h6>
              <span className="flex items-center justify-center bg-orange-500 text-white w-12 h-6 rounded-full">
                <i className="ri-arrow-right-line"></i>
              </span>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 mx-auto">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: "#01d293",
                    textColor: "#fff",
                    trailColor: "#0b0c28",
                    textSize: "18px",
                  })}
                />
              </div>
              <h4 className="text-gray-100 font-light mt-4">Impression Share</h4>
            </div>

            <div className="text-center">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-blue-100 text-blue-500 mb-2">
                <i className="ri-car-line"></i>
              </span>
              <h6 className="text-blue-500 text-lg">$1174</h6>
              <p className="text-gray-400 text-sm">Model Spend</p>
            </div>

            <div className="text-center">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-red-100 text-red-500 mb-2">
                <i className="ri-share-forward-line"></i>
              </span>
              <h6 className="text-red-500 text-lg">$1174</h6>
              <p className="text-gray-400 text-sm">Model Spend</p>
            </div>

            <div className="text-center">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-purple-100 text-purple-500 mb-2">
                <i className="ri-money-dollar-circle-line"></i>
              </span>
              <h6 className="text-purple-500 text-lg">$811</h6>
              <p className="text-gray-400 text-sm">Spend Per Unit Turned</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default SellCar;
