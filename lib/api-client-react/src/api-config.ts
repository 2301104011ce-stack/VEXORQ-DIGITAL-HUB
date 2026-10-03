// API URL configuration
// Automatically resolves backend endpoint whether running locally or on Render

export function getApiBaseUrl(): string {
  // 1. Check Vite environment variable
  const envApiUrl = (import.meta as any).env?.VITE_API_URL;
  if (envApiUrl && typeof envApiUrl === "string" && envApiUrl.trim()) {
    return envApiUrl.trim().replace(/\/$/, "");
  }

  // 2. Check window variable
  if (typeof window !== "undefined" && (window as any).__API_BASE_URL__) {
    return (window as any).__API_BASE_URL__;
  }

  // 3. Fallback for Render deployment if static frontend is separated from backend
  if (typeof window !== "undefined" && window.location?.hostname?.includes("vexorq-web.onrender.com")) {
    return "https://vexorq-api.onrender.com";
  }

  // Default: relative URLs (handled by same-origin Node server or Vite dev proxy)
  return "";
}

export function getFullUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  if (baseUrl && !endpoint.startsWith("http")) {
    return `${baseUrl}${cleanEndpoint}`;
  }
  return cleanEndpoint;
}
