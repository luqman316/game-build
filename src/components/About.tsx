"use client";
import { useState } from "react";

const SECRET_CODES = [
  "alpha123",
  "bravo456",
  "charlie789",
  "delta321",
  "echo654",
  "foxtrot987",
  "golf111",
  "hotel222",
  "india333",
  "juliet444",
  "kilo555",
  "lima666",
  "mike777",
  "november888",
  "oscar999",
];

function About() {
  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const GOOGLE_DRIVE_LINK =
    "https://drive.google.com/uc?export=download&id=143FSv1F8YtmRUHzsIi4dvfqPEmzv1x4S"; // Direct file download link

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (SECRET_CODES.includes(input.trim().toLowerCase())) {
      setSuccess(true);
      setError("");
      // Auto-open Google Drive download link
      window.open(GOOGLE_DRIVE_LINK, "_blank");
    } else {
      setSuccess(false);
      setError("Invalid secret code. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-18 mb-18">
        <div className="flex">
          {/* 1st div */}
          <div
            className="w-full h-[400px] flex flex-col justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: "url('/about/img (3).png')" }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-80 bg-white/80 p-6 rounded-lg shadow-lg"
            >
              <input
                type="text"
                placeholder="Enter Secret Code"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition font-semibold"
              >
                Submit
              </button>
            </form>
            {success && (
              <div className="mt-6 text-center text-green-200 font-semibold">
                The download has started! If it doesn’t, then{" "}
                <a
                  href={GOOGLE_DRIVE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white"
                >
                  click here
                </a>
                .
              </div>
            )}
            {error && !success && (
              <div className="mt-4 text-red-200">{error}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
