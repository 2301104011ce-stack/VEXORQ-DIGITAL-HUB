// API URL configuration
// In production on Netlify, set the API_URL environment variable to point to your deployed backend
// Example: https://vexorq-api.onrender.com

export function getApiBaseUrl(): string {
  // Check for vite environment variable
  const envApiUrl = (import.meta as any).env?.VITE_API_URL;
  if (envApiUrl && envApiUrl.trim()) {
    return envApiUrl;
  }

  // Check for window variable (can be set in index.html)
  if (typeof window !== "undefined" && (window as any).__API_BASE_URL__) {
    return (window as any).__API_BASE_URL__;
  }

  // Default: use relative URLs
  return "";
}

export function getFullUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  if (baseUrl && !endpoint.startsWith("http")) {
    return `${baseUrl}${endpoint}`;
  }
  return endpoint;
}
