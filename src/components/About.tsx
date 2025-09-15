"use client";
import { useState } from "react";

const SECRET_CODES = [
  "KJ3DR-9L8WP-MZ4XT",
  "B7Q2V-ZY9HK-6RM1F",
  "T5L8S-PA7NK-Q2V3M",
  "V9J6D-4X2FM-L1Q7R",
  "N8W5H-R3Y2K-7LPZQ",
  "Q1Z8M-X7T4J-H5L9V",
  "F4M2K-9J6LQ-P7X1Z",
  "L2V9N-Q6W4R-Y8T5K",
  "M7P4F-X1J8L-Q9R6H",
  "Z5Y7V-K3T1Q-W4M8R",
];

function About() {
  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const GOOGLE_DRIVE_LINK =
    "https://drive.google.com/uc?export=download&id=143FSv1F8YtmRUHzsIi4dvfqPEmzv1x4S"; // Direct file download link

  // Normalize code: remove dashes/spaces, lowercase
  const normalize = (str: string) => str.replace(/[-\s]/g, "").toLowerCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = normalize(input);
    const match = SECRET_CODES.some(
      (code) => normalize(code) === normalizedInput
    );
    if (match) {
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
      <div className="mt-36">
        <div className="flex">
          {/* 1st div */}
          <div
            className="w-full h-[400px] flex flex-col  justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: "url('/about/img (3).png')" }}
          >
            <span className="text-white font-extrabold text-xl mb-6">Enter the code to download the build</span>
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
