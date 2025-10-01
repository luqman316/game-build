"use client";

import {
  formatMemory,
  formatUptime,
  getCodeStats,
  getServerHealth,
  isValidCodeFormat,
  redeemGameCode,
  type HealthResponse,
  type StatsResponse,
} from "@/lib/api";
import { useEffect, useState } from "react";

const GameRedeemSystem = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    type: "success" | "error" | "info";
  }>({ message: "", type: "info" });
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [statsData, setStatsData] = useState<StatsResponse | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [serverStatus, setServerStatus] = useState<
    "online" | "offline" | "checking"
  >("checking");

  // Check server status on component mount
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      await getServerHealth();
      setServerStatus("online");
    } catch {
      setServerStatus("offline");
    }
  };

  // Redeem Code Handler
  const handleRedeemCode = async () => {
    if (!code.trim()) {
      setResult({ message: "⚠️ Please enter a code", type: "error" });
      return;
    }

    if (!isValidCodeFormat(code)) {
      setResult({
        message:
          "⚠️ Invalid code format. Code should be 4-20 characters with only letters and numbers.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await redeemGameCode(code);

      if (data.success) {
        if (data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
          setResult({
            message: `✅ Code redeemed successfully! Download expires in ${data.expiresIn} seconds. Remaining uses: ${data.remainingUses}`,
            type: "success",
          });
        } else {
          setResult({
            message: `✅ ${data.message || "Code validated successfully!"}`,
            type: "success",
          });
        }
      } else {
        setResult({
          message: `❌ ${data.msg || "Failed to redeem code"}`,
          type: "error",
        });
        setDownloadUrl(null);
      }
    } catch (error) {
      setResult({
        message: `❌ ${
          error instanceof Error ? error.message : "Network error"
        }`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Health Check Handler
  const handleHealthCheck = async () => {
    try {
      const data = await getServerHealth();
      setHealthData(data);
      setServerStatus("online");
    } catch {
      setServerStatus("offline");
      setResult({ message: "❌ Health check failed", type: "error" });
    }
  };

  // Statistics Handler
  const handleGetStats = async () => {
    try {
      const data = await getCodeStats();
      setStatsData(data);
      setShowStats(true);
    } catch {
      setResult({ message: "❌ Failed to load statistics", type: "error" });
    }
  };

  // Download Handler
  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
      setResult({ message: "📥 Download started!", type: "info" });
    }
  };

  // Sample test codes
  const sampleCodes = [
    "7WPJMKE9",
    "BKRJHH4X",
    "Q4Y3F6RN",
    "VY20Z3XJ",
    "70CCHEAW",
  ];

  // Server status indicator
  const getServerStatusColor = () => {
    switch (serverStatus) {
      case "online":
        return "text-green-400";
      case "offline":
        return "text-red-400";
      case "checking":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getServerStatusText = () => {
    switch (serverStatus) {
      case "online":
        return "🟢 Server Online";
      case "offline":
        return "🔴 Server Offline";
      case "checking":
        return "🟡 Checking...";
      default:
        return "⚪ Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Server Status */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎮 Game Download System
          </h1>
          <p className="text-gray-300 mb-2">
            Enter your code to download the game
          </p>
          <div className={`text-sm ${getServerStatusColor()}`}>
            {getServerStatusText()}
          </div>
        </div>

        {/* Main Redeem Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">
            Redeem Your Code
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="codeInput"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Game Code
              </label>
              <input
                id="codeInput"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleRedeemCode()}
                placeholder="Enter your 8-character code"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={20}
                disabled={loading || serverStatus === "offline"}
              />
            </div>

            <button
              onClick={handleRedeemCode}
              disabled={loading || !code.trim() || serverStatus === "offline"}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? "🔄 Checking..." : "🎮 Redeem Code"}
            </button>

            {/* Download Button */}
            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                📥 Download Game Now
              </button>
            )}
          </div>

          {/* Result Display */}
          {result.message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
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
        </div>

        {/* API Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleHealthCheck}
            disabled={serverStatus === "offline"}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            🏥 Health Check
          </button>

          <button
            onClick={handleGetStats}
            disabled={serverStatus === "offline"}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            📊 View Statistics
          </button>

          <button
            onClick={checkServerStatus}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            🔄 Refresh Status
          </button>
        </div>

        {/* Health Data Display */}
        {healthData && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">
              🏥 Server Health
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-300">
                  Status:{" "}
                  <span className="text-green-400 font-bold">
                    {healthData.status}
                  </span>
                </p>
                <p className="text-gray-300">
                  Uptime:{" "}
                  <span className="text-white">
                    {formatUptime(healthData.uptime)}
                  </span>
                </p>
                <p className="text-gray-300">
                  Node Version:{" "}
                  <span className="text-white">
                    {healthData.environment.node_version}
                  </span>
                </p>
                <p className="text-gray-300">
                  Memory (RSS):{" "}
                  <span className="text-white">
                    {formatMemory(healthData.memory.rss)}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">
                  Port:{" "}
                  <span className="text-white">
                    {healthData.environment.port}
                  </span>
                </p>
                <p className="text-gray-300">
                  MongoDB:{" "}
                  <span
                    className={
                      healthData.environment.mongo_configured
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {healthData.environment.mongo_configured
                      ? "✅ Connected"
                      : "❌ Not configured"}
                  </span>
                </p>
                <p className="text-gray-300">
                  R2 Storage:{" "}
                  <span
                    className={
                      healthData.environment.r2_configured
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {healthData.environment.r2_configured
                      ? "✅ Configured"
                      : "❌ Not configured"}
                  </span>
                </p>
                <p className="text-gray-300">
                  Heap Used:{" "}
                  <span className="text-white">
                    {formatMemory(healthData.memory.heapUsed)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Display */}
        {showStats && statsData && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">
              📊 Code Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-500/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-white">
                  {statsData.stats.totalCodes}
                </p>
                <p className="text-gray-300 text-sm">Total Codes</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-white">
                  {statsData.stats.availableCodes}
                </p>
                <p className="text-gray-300 text-sm">Available</p>
              </div>
              <div className="bg-orange-500/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-white">
                  {statsData.stats.totalUses}
                </p>
                <p className="text-gray-300 text-sm">Total Uses</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-white">
                  {statsData.stats.exhaustedCodes}
                </p>
                <p className="text-gray-300 text-sm">Exhausted</p>
              </div>
            </div>
            <p className="text-gray-300 text-center mt-4">
              Max uses per code: {statsData.maxUsesPerCode}
            </p>

            {/* Usage Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Code Usage Progress</span>
                <span>
                  {Math.round(
                    (statsData.stats.totalUses /
                      (statsData.stats.totalCodes * statsData.maxUsesPerCode)) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (statsData.stats.totalUses /
                        (statsData.stats.totalCodes *
                          statsData.maxUsesPerCode)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Codes */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">🧪 Test Codes</h3>
          <p className="text-gray-300 mb-4">
            Click any code below to auto-fill (100 codes generated in database):
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleCodes.map((sampleCode) => (
              <button
                key={sampleCode}
                onClick={() => setCode(sampleCode)}
                disabled={serverStatus === "offline"}
                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
              >
                {sampleCode}
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-2">
            💡 Each code can be used 2 times maximum • Total 100 codes available
          </p>

          {/* Quick Actions */}
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">🚀 Quick Actions:</p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>
                • Press{" "}
                <kbd className="px-1 py-0.5 bg-gray-700 rounded text-white">
                  Enter
                </kbd>{" "}
                in input to redeem
              </p>
              <p>
                • Backend server:{" "}
                <code className="bg-gray-700 px-1 rounded">
                  http://localhost:3000
                </code>
              </p>
              <p>
                • Frontend server:{" "}
                <code className="bg-gray-700 px-1 rounded">
                  http://localhost:3001
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRedeemSystem;
