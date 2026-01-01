const config = {
    // In production, this should likely be '/api/send-order' (relative) if hosted on same domain
    // or the full production URL if hosted separately.
    // For now, we default to localhost, but allow override via environment variable if using Vite envs
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
};

export default config;
