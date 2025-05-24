import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const FooterLinks = [
  {
    title: "Accueil",
    link: "/#",
  },
  {
    title: "À propos",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl">
      <section className="container">
        <div className="grid md:grid-cols-3 py-5">
          {/* Company Details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif">
              CaroteX
            </h1>
            <p className="text-sm">
              CaroteX est une entreprise spécialisée dans la location de voitures
              au Maroc. Nous offrons des véhicules de qualité pour vos besoins
              professionnels et personnels.
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Casablanca, Maroc</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+212 6 123 456 78</p>
            </div>
            {/* Social Handle */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <FaInstagram className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            {/* Important Links */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Liens Importants
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link, index) => (
                  <li
                    key={`important-${index}`}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200"
                  >
                    <span>&#11162;</span>
                    <span>{link.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Liens
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link, index) => (
                  <li
                    key={`links-${index}`}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200"
                  >
                    <span>&#11162;</span>
                    <span>{link.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Emplacement
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link, index) => (
                  <li
                    key={`location-${index}`}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200"
                  >
                    <span>&#11162;</span>
                    <span>{link.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
