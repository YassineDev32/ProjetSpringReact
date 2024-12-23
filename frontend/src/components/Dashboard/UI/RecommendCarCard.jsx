import React from "react";

const RecommendCarCard = (props) => {
  const { carName, retweet, imgUrl, rentPrice, percentage } = props.item;
  return (
    <div className="p-5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
      {/* Car Top */}
      <div className="recommend__car-top mb-4">
        <h5 className="flex items-center gap-2 text-blue-300 text-lg font-medium">
          <i className="ri-refresh-line text-xl"></i>
          {percentage}% Recommended
        </h5>
      </div>

      {/* Car Image */}
      <div className="recommend__car-img mb-4">
        <img
          src={imgUrl}
          alt={carName}
          className="w-full h-40 object-cover rounded-md shadow-md"
        />
      </div>

      {/* Car Bottom */}
      <div className="recommend__car-bottom">
        <h4 className="text-white text-xl font-semibold mb-3">{carName}</h4>
        <div className="recommend__car-other flex items-center justify-between">
          <div className="recommend__icons flex items-center gap-4">
            <p className="flex items-center gap-2 text-blue-300">
              <i className="ri-repeat-line text-secondary-color"></i>
              {retweet}k
            </p>
            <p className="text-blue-300">
              <i className="ri-settings-2-line text-secondary-color"></i>
            </p>
            <p className="text-blue-300">
              <i className="ri-timer-flash-line text-secondary-color"></i>
            </p>
          </div>
          <span className="text-green-400 font-medium text-lg">
            ${rentPrice}/h
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendCarCard;
