export const base_url =
  process.env.NODE_ENV === "production"
    ? "https://mernecomm-backend.onrender.com/api/"
    : "http://localhost:5000/api/";
