import React from "react";

const Contact = () => {
  return (
    <>
      <span id="contact"></span>
      <div data-aos="zoom-in" className="dark:bg-black dark:text-white py-14">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-600 py-8 px-6 rounded-xl shadow-lg">
            {/* Text Section */}
            <div className="col-span-2 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Collaborons sur votre prochain projet de location de voitures
              </h1>
              <p className="text-gray-400">
                Pour toute demande concernant la location de voitures au Maroc, 
                contactez-nous pour des solutions adaptées à vos besoins. 
                Nous sommes disponibles à Casablanca, Rabat et Marrakech.
              </p>
            </div>

            {/* Button Section */}
            <div className="sm:grid sm:place-items-center">
              <a
                href="#"
                className="inline-block font-semibold py-3 px-8 bg-primary text-white hover:bg-primary/80 duration-200 tracking-widest uppercase rounded-full shadow-md"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
