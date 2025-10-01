// API utility functions for backend communication

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://game-build-backend.vercel.app";

export interface RedeemResponse {
  success: boolean;
  downloadUrl?: string;
  expiresIn?: number;
  remainingUses?: number;
  message?: string;
  msg?: string;
}

export interface HealthResponse {
  status: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  timestamp: string;
  environment: {
    node_version: string;
    port: number;
    mongo_configured: boolean;
    r2_configured: boolean;
  };
}

export interface StatsResponse {
  success: boolean;
  stats: {
    totalCodes: number;
    totalUses: number;
    availableCodes: number;
    exhaustedCodes: number;
  };
  maxUsesPerCode: number;
}

// Redeem a game code
async function redeemGameCode(code: string): Promise<RedeemResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code.trim().toUpperCase() }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Redeem API error:", error);
    throw new Error("Failed to redeem code. Please check your connection.");
  }
}

// Get server health status
async function getServerHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Health API error:", error);
    throw new Error("Failed to fetch server health.");
  }
}

// Get code statistics
async function getCodeStats(): Promise<StatsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/code-stats`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Stats API error:", error);
    throw new Error("Failed to fetch statistics.");
  }
}

// Check if server is reachable
async function pingServer(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    return response.ok;
  } catch (error) {
    console.error("Ping error:", error);
    return false;
  }
}

// Format uptime in human readable format
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const mins = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);

  if (days > 0) {
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  } else if (hours > 0) {
    return `${hours}h ${mins}m ${secs}s`;
  } else if (mins > 0) {
    return `${mins}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

// Format memory usage
function formatMemory(bytes: number): string {
  const MB = bytes / (1024 * 1024);
  return `${MB.toFixed(1)} MB`;
}

// Validate code format
function isValidCodeFormat(code: string): boolean {
  const trimmedCode = code.trim();
  return (
    trimmedCode.length >= 4 &&
    trimmedCode.length <= 20 &&
    /^[A-Z0-9]+$/.test(trimmedCode)
  );
}

// Export all functions as named exports
export {
  formatMemory,
  formatUptime,
  getCodeStats,
  getServerHealth,
  isValidCodeFormat,
  pingServer,
  redeemGameCode,
};
