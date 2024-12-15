import React from "react";

import masterCard from "../../assets/car1.png";
import paypal from "../../assets/car1.png";

const PaymentMethod = () => {
  return (
    <>
      <div className="payment mb-4">
        <label className="flex items-center gap-2 font-semibold text-blue-900">
          <input type="radio" /> Direct Bank Transfer
        </label>
      </div>

      <div className="payment mb-4">
        <label className="flex items-center gap-2 font-semibold text-blue-900">
          <input type="radio" /> Cheque Payment
        </label>
      </div>

      <div className="payment mb-4 flex items-center justify-between">
        <label className="flex items-center gap-2 font-semibold text-blue-900">
          <input type="radio" /> Master Card
        </label>
        <img src={masterCard} alt="Master Card" className="w-16" />
      </div>

      <div className="payment mb-4 flex items-center justify-between">
        <label className="flex items-center gap-2 font-semibold text-blue-900">
          <input type="radio" /> Paypal
        </label>
        <img src={paypal} alt="Paypal" className="w-16" />
      </div>

      <div className="payment text-right mt-8">
        <button className="px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition duration-300">
          Reserve Now
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
