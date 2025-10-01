"use client";

import { useState } from "react";

interface Code {
  code: string;
  usedCount: number;
  maxUses: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codes, setCodes] = useState<Code[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCodes, setShowCodes] = useState(false);

  // Dummy credentials
  const ADMIN_EMAIL = "admin@gamedev.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
      console.log("✅ Admin login successful");
    } else {
      setError("Invalid credentials!");
      console.log("❌ Login failed");
    }
  };

  const fetchCodes = async () => {
    try {
      setLoading(true);

      // API URL - automatically switches between development and production
      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000" // Development server
          : "https://game-build-backend.vercel.app"; // Production server

      // Fetch ALL codes (not paginated) - set high limit to get all
      const response = await fetch(`${API_BASE_URL}/api/get-codes?limit=1000`);
      const data = await response.json();

      if (data.success) {
        setCodes(data.data.codes || []);
        setShowCodes(true);
        console.log(
          `📊 Loaded ${data.data.codes?.length || 0} codes from database`
        );
      } else {
        setError("Failed to load codes");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyAllCodes = () => {
    const codeList = codes.map((c) => c.code).join("\n");
    navigator.clipboard.writeText(codeList);
    alert("All codes copied to clipboard!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🔐 Admin Panel
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                placeholder="Enter admin email"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all font-semibold"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-white/60 text-xs">
            <p>💡 Hint: Check the source code for credentials</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              🎮 Game Codes Admin Panel
            </h1>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={fetchCodes}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50"
            >
              {loading ? "⏳ Loading..." : "📥 Load All Codes"}
            </button>

            {codes.length > 0 && (
              <>
                <button
                  onClick={copyAllCodes}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold"
                >
                  📋 Copy All Codes
                </button>

                <button
                  onClick={() => setShowCodes(!showCodes)}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all font-semibold"
                >
                  {showCodes ? "👁️ Hide Codes" : "👁️ Show Codes"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        {codes.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">📊 Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-500/20 rounded-lg p-4">
                <div className="text-blue-300 text-sm">Total Codes</div>
                <div className="text-white text-2xl font-bold">
                  {codes.length}
                </div>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4">
                <div className="text-green-300 text-sm">Available</div>
                <div className="text-white text-2xl font-bold">
                  {codes.filter((c) => c.usedCount < c.maxUses).length}
                </div>
              </div>
              <div className="bg-red-500/20 rounded-lg p-4">
                <div className="text-red-300 text-sm">Used Up</div>
                <div className="text-white text-2xl font-bold">
                  {codes.filter((c) => c.usedCount >= c.maxUses).length}
                </div>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-4">
                <div className="text-purple-300 text-sm">Total Downloads</div>
                <div className="text-white text-2xl font-bold">
                  {codes.reduce((sum, c) => sum + c.usedCount, 0)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Codes Table */}
        {showCodes && codes.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">🔑 All Codes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Code</th>
                    <th className="text-left py-3 px-4">Used</th>
                    <th className="text-left py-3 px-4">Max Uses</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((code, index) => {
                    const remaining = code.maxUses - code.usedCount;
                    const isAvailable = remaining > 0;

                    return (
                      <tr
                        key={code.code}
                        className="border-b border-white/10 hover:bg-white/5"
                      >
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4 font-mono text-yellow-300">
                          {code.code}
                        </td>
                        <td className="py-3 px-4">{code.usedCount}</td>
                        <td className="py-3 px-4">{code.maxUses}</td>
                        <td className="py-3 px-4">
                          {isAvailable ? (
                            <span className="text-green-400">
                              ✅ Available ({remaining} left)
                            </span>
                          ) : (
                            <span className="text-red-400">❌ Used Up</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(code.code)
                            }
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            📋 Copy
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-4 text-red-300 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
