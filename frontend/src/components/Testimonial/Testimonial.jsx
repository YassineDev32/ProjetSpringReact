import React from "react";

const testimonialData = [
  {
    name: "Ahmed Ben Youssef",
    image: "",
    description: "Un service exceptionnel et une voiture en parfait état. Je recommande vivement cette agence pour vos locations au Maroc.",
    aosDelay: "0",
  },
  {
    name: "Fatima El Amrani",
    image: "",
    description: "J'ai loué une voiture pour un week-end à Marrakech, tout était impeccable. Le personnel est très professionnel.",
    aosDelay: "300",
  },
  {
    name: "Mohamed Zaki",
    image: "",
    description: "Excellent rapport qualité/prix. La réservation a été rapide et simple. Je reviendrai certainement pour ma prochaine visite.",
    aosDelay: "1000",
  },
];

const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Ce Que Nos Clients Disent
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              Découvrez les avis de nos clients satisfaits ayant loué nos voitures au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((testimonial) => (
              <div
                key={testimonial.name}
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src="https://picsum.photos/200"
                    alt={`Photo de ${testimonial.name}`}
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{testimonial.description}</p>
                <p className="text-center font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
