import { useState, useEffect } from "react";
import Particles from "../components/Particles";
import Image1 from "../assets/images/1.jpg";
import Image2 from "../assets/images/2.jpeg";
import Image3 from "../assets/images/3.jpg";
import Image4 from "../assets/images/4.jpg";

const images = [Image1, Image2, Image3, Image4];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [bgImage, setBgImage] = useState(images[0]);

  // Auto-cycle big box images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setBgImage(images[(currentImage + 1) % images.length]);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, [currentImage]);

  // Click handlers for small cards
  const handleCardClick = (image) => {
    setBgImage(image);
    setCurrentImage(images.indexOf(image));
  };

  return (
    <>
      <Particles
        particleColors={["#e5a50a"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />

      <div className="home-container">
        {/* Big Box */}
        <div
          className="big-box"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Small Cards */}
        <div className="cards-container">
          <div
            className="small-card"
            onClick={() => handleCardClick(Image1)}
            style={{ backgroundImage: `url(${Image1})` }}
          ></div>
          <div
            className="small-card"
            onClick={() => handleCardClick(Image2)}
            style={{ backgroundImage: `url(${Image2})` }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Home;
