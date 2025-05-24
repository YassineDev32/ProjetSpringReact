import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMediaQuery } from "@mui/material";
import { ReactTyped } from "react-typed";

const CarModel = () => {
  const { scene } = useGLTF("/porsche.glb"); // Replace with your model path
  const modelRef = useRef();
  const isMobile = useMediaQuery("(max-width:600px)");

  // Rotate the model automatically
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.004; // Adjust rotation speed as needed
    }
  });

  return (
    <primitive object={scene} ref={modelRef} scale={isMobile ? 1.2 : 1.7} />
  ); // Scale down on mobile
};

const Hero = ({ theme }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    AOS.refresh();
  });

  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <div
              data-aos="zoom-in"
              data-aos-duration="1500"
              data-aos-once="false"
              className="sm:scale-125 relative -z-10 max-h-[600px]"
            >
              <Canvas
                gl={{ alpha: true }}
                style={{
                  background: "transparent",
                  width: isMobile ? "300px" : "800px",
                  height: isMobile ? "400px" : "500px",
                }}
              >
                {/* Lighting setup */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={0.7} />

                {/* Optional: Environment lighting for realistic reflections */}
                <Environment preset="city" />

                {/* Controls */}
                <OrbitControls enableZoom={false} />
                <CarModel />
              </Canvas>
            </div>
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">
              Effortless
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              <ReactTyped
                strings={[
                  "Rent Your Dream Car",
                  "Effortless Car Rentals",
                  "Your Journey Begins Here!",
                ]}
                typeSpeed={40}
                backSpeed={50}
                loop
              />
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              We offer a convenient and affordable car rental service for
              individuals. Whether you're traveling for business or leisure, our
              fleet is designed to meet your needs, ensuring a smooth and
              hassle-free experience.
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1500"
              className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
