import About from "@/components/About";
import Hero from "@/components/Hero";

function MainPage() {
  return (
    <>
      <div className="">
        <h1 className="font-papyrus text-4xl text-center mt-8 mb-4 text-purple-800">
          Welcome to the Game Build
        </h1>
        <About />
        <Hero />
      </div>
    </>
  );
}

export default MainPage;
