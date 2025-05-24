import React from "react";
import { FaCar } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { SlUser } from "react-icons/sl";


const skillsData = [
  {
    name: "Meilleur Prix",
    icon: (
      <FaCar className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description:
      "Nous offrons des tarifs compétitifs pour toutes nos locations de voitures.",
    aosDelay: "0",
  },
  {
    name: "Rapide et Sécurisé",
    icon: (
      <GiCarWheel className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description:
      "Profitez d'un service rapide et sécurisé pour vos déplacements.",
    aosDelay: "500",
  },
  {
    name: "Chauffeurs Expérimentés",
    icon: (
      <SlUser className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description:
      "Nos chauffeurs professionnels garantissent une expérience agréable et sûre.",
    aosDelay: "1000",
  },
];

const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Pourquoi Nous Choisir
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
              >
                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
                <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                >
                  En savoir plus
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
