import React from "react";

const CarItem = (props) => {
  const { category, model, fuelType, price, image,seats } = props.item;
  return (
    <div className="p-5 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Car Item Top */}
      <div className="car__item-top mb-4">
        <div className="car__item-title flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold"> {model.name}</h3>
          <span>
            <i className="ri-heart-line text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform duration-200"></i>
          </span>
        </div>
        <p className="text-gray-400 text-sm font-medium">{model.mark.name}</p>
      </div>

      {/* Car Image */}
      <div className="car__img mb-[20px]">
        <img src={`data:image/png;base64,${image}`} className="w-[100%] object-cover rounded-[5px]" />
      </div>

      {/* Car Item Bottom */}
      <div className="car__item-bottom flex items-center justify-between">
        <div className="car__bottom-left flex items-center gap-6">
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <i className="ri-user-line text-blue-400"></i> {seats}
          </p>
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <i className="ri-repeat-line text-blue-400"></i> {fuelType}
          </p>
        </div>
        <p className="car__rent text-green-500 text-lg font-semibold">
          ${price}/d
        </p>
      </div>
    </div>
  );
};

export default CarItem;
