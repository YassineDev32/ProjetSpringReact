import React from "react";

const SingleCard = (props) => {
  const { title, totalNumber, icon } = props.item;
  return (
    <div className="single__card p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg cursor-pointer flex justify-between items-center hover:scale-105 transition-transform duration-300">
      {/* Card Content */}
      <div className="card__content flex flex-col justify-center">
        <h4 className="text-white text-lg font-medium mb-2">{title}</h4>
        <span className="text-white text-4xl font-bold">{totalNumber}+</span>
      </div>

      {/* Card Icon */}
      <span className="card__icon text-5xl text-white opacity-90">
        <i className={icon}></i>
      </span>
    </div>
  );
};

export default SingleCard;
