import Image from "next/image";

function Header() {
  return (
    <>
      {/* fixed top-0 left-0 w-full z-50 */}
      <div className="bg-black fixed top-0 left-0 w-full z-50 ">
        <div className="container mx-auto">
          {/* 1st div for images */}
          <div className=" mx-16 flex justify-between items-center">
            <div className="flex justify-start items-center">
              <Image
                src="/header/img2.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>
            <div className="flex justify-center items-center">
              <Image
                src="/header/img1.png"
                alt="Logo"
                width={250}
                height={250}
                // className="flex justify-evenly"
              />
            </div>
            <div className="">
              {/* <Image
                src="/header/img1.png"
                alt="Logo"
                width={100}
                height={100}
                // className="flex justify-evenly"
              /> */}
            </div>
          </div>
          {/* <br />
          <br />
          <br /> */}
          {/* 2nd div for text */}
          {/* <div className=" mx-12 flex justify-start items-center text-white">
            <div className="flex space-x-12">
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Coming Soon</Link>
              <Link href={"/"}>The Series </Link>
              <Link href={"/"}>About Us</Link>
              <Link href={"/"}>Contact Us</Link>
            </div>
          </div> */}
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Header;
