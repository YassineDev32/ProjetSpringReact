import React from "react";
import { Link } from "react-router-dom";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";

const carList = [
  {
    id: 1,
    name: "BMW Série 3",
    price: 750,
    image: whiteCar,
    aosDelay: "0",
  },
  {
    id: 2,
    name: "KIA Sportage",
    price: 450,
    image: car2,
    aosDelay: "500",
  },
  {
    id: 3,
    name: "Audi A4",
    price: 950,
    image: car3,
    aosDelay: "1000",
  },
];

const CarList = () => {
  return (
    <div className="pb-24">
      <div className="container">
        {/* Titre */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Découvrez Notre Sélection de Voitures
        </h1>
        <p data-aos="fade-up" data-aos-delay="400" className="text-sm pb-10">
          Choisissez parmi une large gamme de véhicules adaptés à vos besoins. Que ce soit pour un voyage, un déplacement professionnel ou une aventure, nous avons ce qu'il vous faut !
        </p>

        {/* Liste des voitures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {carList.map((data) => (
            <div
              key={data.id}
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
            >
              <div className="w-full h-[120px]">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-primary font-semibold">{data.name}</h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>{data.price}Mad/jour</p>
                  <a href="#">Détails</a>
                </div>
              </div>
              <p className="text-xl font-semibold absolute top-0 left-3">
                12Km inclus
              </p>
            </div>
          ))}
        </div>

        {/* Bouton de démarrage */}
        <div className="grid place-items-center mt-8">
        <Link to="/login">
          <button data-aos="fade-up" className="button-outline">
            Commencez
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default CarList;
