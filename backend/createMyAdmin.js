const db = require("./models");
const Admin = db.Admin;
const sequelize = require("./config/db");
require("dotenv").config();

const createMyAdmin = async () => {
  try {
    // First, sync the database to create tables
    await sequelize.sync({ force: false });
    console.log("Database synced successfully");

    // Check if admin with this email already exists
    const existingAdmin = await Admin.findOne({
      where: { email: "vagus.admin@gmail.com" },
    });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      return;
    }

    // Create admin with your specified credentials
    const adminData = {
      email: "vagus.admin@gmail.com",
      password: "Shiva@143",
      name: "Vagus Admin",
      role: "admin",
    };

    const admin = await Admin.create(adminData);

    console.log("✅ Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Name:", admin.name);
    console.log("");
    console.log("You can now login with these credentials!");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    process.exit();
  }
};

createMyAdmin();
