import Link from "next/link";

function Hero() {
  return (
    <>
      <div className="mt-10 flex flex-col items-center justify-center w-full overflow-hidden text-white">
        <section
          className="relative w-full min-h-[399px] flex flex-col items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero/img.jpg')",
            imageResolution: "from-image",
          }}
        >
          <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl ">
              <div className="">
                <div className="flex justify-end ">
                  <h1 className="text-6xl sm:text-5xl md:text-6xl font-extrabold text-white text-right">
                    <span className="text-8xl">WELCOME</span> <br />
                    <span className="text-8xl">TO THE</span> <br />
                    <span className="text-8xl text-emerald-500/80">STORY</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 2nd */}
        <section
          className="relative w-full min-h-[399px] bg-[#8625B9] flex flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/hero/img1.png')" }}
        >
          <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl ">
              <div className="flex justify-end mr-26">
                <div className="flex flex-col items-center justify-center text-center bg-[#B8ACBE] w-[342px] h-[360px] rounded-xl ">
                  <p className="text-black p-4 text-center ">
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
                    className="bg-[#00FFBE] px-10 py-2 rounded-3xl hover:bg-black text-black   hover:text-yellow-400 "
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
          className="relative w-full h-[346px] border-t-2 border-black flex flex-col items-center justify-center bg-cover bg-local bg-center"
          style={{
            backgroundImage: "url('/hero/img2.png')",
            imageResolution: "from-image",
          }}
        >
          <div className=" py-12 px-4 sm:px-6 lg:px-8">
            <div className="">
              <div className="">
                <div className="flex flex-col justify-center ">
                  <h3 className="text-4xl sm:text-3xl md:text-4xl font-extrabold text-white text-center">
                    COMING SOON
                  </h3>
                  <h1 className="mt-2 text-7xl  bg-clip-text sm:text-3xl md:text-7xl font-extrabold text-white text-center ">
                    THE GAME
                  </h1>
                  <p className="text-center mt-8 ">
                    Wield Heaven’s power. Face eternity’s darkest enemy.
                  </p>
                  <Link href={"/"} className="flex justify-center">
                    <button className="bg-[#00FFBE]  px-8 py-2 text-center mt-4  flex justify-center rounded-3xl hover:bg-black text-black   hover:text-yellow-400 ">
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

//   <div className="relative w-full min-h-[399px] ">
//           <Image
//             src="/hero/img.jpg"
//             alt="ss"
//             fill
//             style={{ objectFit: "cover" }}
//             quality={100}
//             className=""
//             priority
//           />
//           <div className="px-9 absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
//             <div>
//               <span className="bg-white/30 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
//                 Destination
//               </span>
//             </div>
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                 Exploring the Wonders of Hiking
//               </h2>
//               <p className="text-white text-lg max-w-xl mb-6">
//                 An iconic landmarks, this post unveils the secrets that make
//                 this destination a travelers paradise.
//               </p>
//               <div className="flex items-center gap-3">
//                 {/* <Image
//                       src="/profile.jpg"
//                       alt="Author"
//                       width={40}
//                       height={40}
//                       className="rounded-full border-2 border-white"
//                     /> */}
//                 <div>
//                   <div className="text-white font-semibold">
//                     Theodore Reginald
//                   </div>
//                   <div className="text-white/80 text-sm flex gap-2">
//                     <span>24 Jan 2024</span>
//                     <span>•</span>
//                     {/* <span>10 mins read</span> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
