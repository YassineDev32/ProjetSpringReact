import React from "react";
import Marquee from "react-fast-marquee"; // Make sure this package is installed
import AppStoreImg from "../../assets/website/app_store.png";
import PlayStoreImg from "../../assets/website/play_store.png";
import car5 from "../../assets/car5.png";

// Import your images for the marquee
import img1 from "../../assets/bmw-logo.png";
import img2 from "../../assets/suzuki-logo.png";
import img3 from "../../assets/dacia-logo.png";
import img4 from "../../assets/fiat-logo.png";
import img5 from "../../assets/ford-logo.png";
import img6 from "../../assets/suzuki-logo.png";
import img7 from "../../assets/hyundai-logo.png";
import img8 from "../../assets/jeep-logo.png";
import img9 from "../../assets/nissan-logo.png";
import img10 from "../../assets/peugeot-logo.png";

const bannerImg = {
  backgroundImage: `url(${car5})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const AppStoreBanner = () => {
  return (
    <div className="container">
      {/* Main Banner Section */}
      <p  data-aos="fade-up"
           className="text-3xl font-semibold text-center sm:text-4xl font-serif">
        Toutes Nos Marques
      </p>

      {/* Marquee Section */}
      <div className="mt-10">
        <Marquee direction="right" speed={100} delay={5}>
          <div className="image_wrapper">
            <img src={img1} alt="Image 1" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img2} alt="Image 2" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img3} alt="Image 3" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img4} alt="Image 4" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img5} alt="Image 5" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img6} alt="Image 6" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img7} alt="Image 7" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img8} alt="Image 8" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img src={img9} alt="Image 9" className="h-[100px] object-contain" />
          </div>
          <div className="image_wrapper">
            <img
              src={img10}
              alt="Image 10"
              className="h-[100px] object-contain"
            />
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default AppStoreBanner;
