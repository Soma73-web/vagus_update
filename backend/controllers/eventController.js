const { Event } = require("../models");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { isActive: true },
      order: [["eventDate", "DESC"]],
    });

    res.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Create event (admin only)
const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, imageUrl, category } = req.body;
    const addedBy = req.admin?.username || "admin";

    const event = await Event.create({
      title,
      description,
      eventDate,
      imageUrl,
      category,
      addedBy,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// Update event (admin only)
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    await Event.update(updateData, { where: { id } });

    const updatedEvent = await Event.findByPk(id);

    res.json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

// Delete event (admin only)
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await Event.update({ isActive: false }, { where: { id } });

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
