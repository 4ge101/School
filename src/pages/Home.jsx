import Particles from "../components/Particles";

function Home() {
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
    </>
  );
}

export default Home;
