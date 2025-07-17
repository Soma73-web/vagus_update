import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { showSuccess, showError } from "../utils/notifications";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("admin_token");
    if (token) {
      // Verify token validity
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.status === 200) {
        navigate("/admin");
      }
    } catch (err) {
      // Token is invalid, remove it
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_logged_in");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        credentials,
      );

      if (res.status === 200) {
        // Store JWT token and admin info
        localStorage.setItem("admin_token", res.data.token);
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("admin_info", JSON.stringify(res.data.admin));

        // Set up auto-logout timer (30 minutes)
        setupAutoLogout();

        navigate("/admin");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const setupAutoLogout = () => {
    // Clear any existing timer
    if (window.adminLogoutTimer) {
      clearTimeout(window.adminLogoutTimer);
    }

    // Set new timer for 30 minutes (1800000 ms)
    window.adminLogoutTimer = setTimeout(() => {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_logged_in");
      localStorage.removeItem("admin_info");
      navigate("/admin-login");
      alert("Session expired due to inactivity. Please login again.");
    }, 1800000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          className="input mb-2 w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          className="input mb-4 w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
