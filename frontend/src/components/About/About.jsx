import React from "react";
import CarPng from "../../assets/dacia.png";
import { ReactTyped } from "react-typed";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif underline decoration-[#00df9a]"
              >
                À propos de nous
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              Qui sommes-nous ?
              Nous sommes une entreprise dédiée à la location de voitures, 
              offrant des véhicules modernes, fiables et adaptés à tous vos besoins. 
              Que ce soit pour un déplacement professionnel, 
              un voyage en famille ou une escapade de dernière minute, 
              notre objectif est de vous fournir un service de qualité, 
              des tarifs compétitifs et une expérience sans souci. 
              nous sommes là pour rendre votre trajet confortable et agréable
              </p>
              <p data-aos="fade-up">
              Vous pouvez réserver la voiture de votre choix
                <ReactTyped
                  className="text-[1rem] font-bold md:pl-1"
                  strings={["Dacia", "Clio", "Golf", "Polo", "Hyandai"]}
                  typeSpeed={120}
                  backSpeed={140}
                  loop
                />
              </p>
              <button data-aos="fade-up" className="button-outline">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
