import Link from "next/link";

function Hero() {
  return (
    <>
      <div className="mt-10 flex flex-col items-center justify-center w-full overflow-hidden text-white font-papyrus">
        <section
          className="relative w-full min-h-[300px] sm:min-h-[350px] md:min-h-[399px] flex flex-col items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero/img.jpg')",
            imageResolution: "from-image",
          }}
        >
          <div className="w-full py-8 px-2 sm:py-12 sm:px-4 md:px-6 lg:px-8">
            <div className="w-full max-w-6xl ">
              <div className="">
                <div className="flex justify-end ">
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-right leading-tight">
                    <span className="block text-4xl xs:text-5xl sm:text-7xl md:text-8xl">
                      WELCOME
                    </span>
                    <span className="block text-4xl xs:text-5xl sm:text-7xl md:text-8xl">
                      TO THE
                    </span>
                    <span className="block text-4xl xs:text-5xl sm:text-7xl md:text-8xl text-emerald-500/80">
                      STORY
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 2nd */}
        <section
          className="relative w-full min-h-[300px] sm:min-h-[350px] md:min-h-[399px] bg-[#8625B9] flex flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/hero/img1.png')" }}
        >
          <div className="w-full py-8 px-2 sm:py-12 sm:px-4 md:px-6 lg:px-8">
            <div className="w-full max-w-6xl ">
              <div className="flex justify-center md:justify-end md:mr-26">
                <div className="flex flex-col items-center justify-center text-center bg-[#B8ACBE] w-full max-w-xs sm:max-w-sm md:w-[342px] md:h-[360px] rounded-xl p-4 sm:p-6">
                  <p className="text-black p-2 sm:p-4 text-center text-base sm:text-lg md:text-sm lg:text-md">
                    Leon Dawes Comics invites you into a world of dynamic
                    artwork and powerful storytelling. This Graphic novel series
                    transports readers into a realm of dark imagination,
                    haunting beauty, and thrilling adventure. With bold visuals
                    and unforgettable narratives, C.L. Dawes Comics and Games
                    delivers this unique story that captivates and inspires long
                    after the last page. Step inside and discover a universe
                    unlike any other.
                  </p>
                  <Link
                    href={"/"}
                    className="bg-[#00FFBE] px-6 sm:px-10 py-2 rounded-3xl hover:bg-black text-black hover:text-yellow-400 text-base sm:text-lg mt-2"
                  >
                    EXPLORE OUR COMICS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 3rd */}
        <section
          className="relative w-full h-[220px] sm:h-[280px] md:h-[346px] border-t-2 border-black flex flex-col items-center justify-center bg-cover bg-local bg-center"
          style={{
            backgroundImage: "url('/hero/img2.png')",
            imageResolution: "from-image",
          }}
        >
          <div className="py-6 px-2 sm:py-12 sm:px-4 lg:px-8">
            <div className="">
              <div className="">
                <div className="flex flex-col justify-center ">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center">
                    COMING SOON
                  </h3>
                  <h1 className="mt-2 text-4xl sm:text-5xl md:text-7xl bg-clip-text font-extrabold text-white text-center ">
                    THE GAME
                  </h1>
                  <p className="text-center mt-4 sm:mt-8 text-base sm:text-lg">
                    Wield Heaven’s power. Face eternity’s darkest enemy.
                  </p>
                  <Link href={"/"} className="flex justify-center">
                    <button className="bg-[#00FFBE] px-6 sm:px-8 py-2 text-center mt-4 flex justify-center rounded-3xl hover:bg-black text-black hover:text-yellow-400 text-base sm:text-lg">
                      COMING SOON
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Hero;
