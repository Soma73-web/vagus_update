const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// Simple admin auth middleware
const authenticateAdmin = (req, res, next) => {
  const adminAuth = req.header("Admin-Auth");
  if (adminAuth === "admin-authenticated") {
    req.admin = { username: "admin" };
    next();
  } else {
    res.status(401).json({ error: "Admin access required" });
  }
};

// Public routes
router.get("/", getAllEvents);

// Admin routes
router.post("/", authenticateAdmin, createEvent);
router.put("/:id", authenticateAdmin, updateEvent);
router.delete("/:id", authenticateAdmin, deleteEvent);

module.exports = router;
