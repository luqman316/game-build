"use client";

import { useEffect, useState } from "react";

const SimpleGameRedeem = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    type: "success" | "error" | "info";
  }>({ message: "", type: "info" });
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // API URL - automatically switches between development and production
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000" // Development server
      : "https://game-build-backend.vercel.app"; // Production server

  // Countdown timer for code expiry
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeRemaining && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            setResult({
              message: "⏰ Code has expired! Please get a new code.",
              type: "error",
            });
            setDownloadUrl(null);
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeRemaining]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Redeem Code Handler
  const handleRedeemCode = async () => {
    if (!code.trim()) {
      setResult({ message: "⚠️ Please enter your game code", type: "error" });
      return;
    }

    setLoading(true);
    setResult({ message: "", type: "info" });
    setDownloadUrl(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });

      const data = await response.json();

      if (data.success) {
        setDownloadUrl(data.downloadUrl);
        setTimeRemaining(data.codeExpiresIn);
        setResult({
          message: `✅ Success! Your game download is ready. Time remaining: ${formatTime(
            data.codeExpiresIn || 60
          )}`,
          type: "success",
        });

        // Auto-start download
        if (data.downloadUrl) {
          setTimeout(() => {
            window.open(data.downloadUrl, "_blank");
          }, 1000);
        }
      } else {
        setResult({
          message: `❌ ${data.message || "Invalid or expired code"}`,
          type: "error",
        });
      }
    } catch {
      setResult({
        message: "❌ Connection error. Please check if the server is running.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manual download handler
  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
      setResult({ message: "📥 Download started in new tab!", type: "info" });
    }
  };

  return (
    <div className="min-h-screen mt-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Game Download
            </h1>
            <p className="text-gray-300 text-sm">
              Enter your code to access the game
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="gameCode"
                className="block text-sm font-medium text-gray-300 mb-3"
              >
                Game Code
              </label>
              <input
                id="gameCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleRedeemCode();
                  }
                }}
                placeholder="Enter your code here"
                className="w-full px-4 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white text-center text-lg font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                maxLength={20}
                disabled={loading}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleRedeemCode}
              disabled={loading || !code.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Validating...
                </div>
              ) : (
                "🚀 Access Game"
              )}
            </button>

            {/* Download Button */}
            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
              >
                📥 Download Game Now
              </button>
            )}
          </div>

          {/* Time Remaining */}
          {timeRemaining !== null && timeRemaining > 0 && (
            <div className="mt-4 text-center">
              <div className="text-yellow-400 font-mono text-lg">
                ⏱️ Time remaining: {formatTime(timeRemaining)}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeRemaining / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Result Message */}
          {result.message && (
            <div
              className={`mt-6 p-4 rounded-xl text-center ${
                result.type === "success"
                  ? "bg-green-500/20 border border-green-500/30 text-green-100"
                  : result.type === "error"
                  ? "bg-red-500/20 border border-red-500/30 text-red-100"
                  : "bg-blue-500/20 border border-blue-500/30 text-blue-100"
              }`}
            >
              {result.message}
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs">
              💡 Code works for 2 downloads and expires after 1 minute of first
              use
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Secure download system powered by Cloudflare
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleGameRedeem;
