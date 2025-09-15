import Image from "next/image";

function Footer() {
  return (
    <>
      <footer className="mt-10 mb-2 container mx-auto">
        <div className="flex flex-row justify-between">
          <div className="mx-16">
            <div className="">
              <Image
                src="/header/img (7).png"
                alt="Logo"
                width={300}
                height={100}
              />
            </div>
          </div>

          <div className="font-mono text-white">
            <div className="flex flex-col justify-center items-center">
              <h1>SHOPS & MERCH</h1>
              <h1>Privacy Policy</h1>
              <h1>Guarantee Agreement</h1>
              <h1>Terms & Conditions</h1>
              <h1>Refund Policy</h1>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
