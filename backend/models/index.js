const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();

const basename = path.basename(__filename);
const db = {};

// Use the existing sequelize instance from config
const sequelize = require("../config/db");

// Dynamically load all models
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"))
  .forEach((file) => {
    const modelFile = require(path.join(__dirname, file));

    // Handle different export patterns
    let model;
    if (typeof modelFile === "function") {
      // Function export pattern: module.exports = (sequelize, DataTypes) => { ... }
      model = modelFile(sequelize, Sequelize.DataTypes);
    } else if (modelFile.default && typeof modelFile.default === "function") {
      // ES6 default export function
      model = modelFile.default(sequelize, Sequelize.DataTypes);
    } else if (modelFile && typeof modelFile === "object" && modelFile.name) {
      // Direct model export pattern: module.exports = ModelInstance
      model = modelFile;
    } else {
      console.error(`Invalid model export in ${file}`);
      return;
    }

    db[model.name] = model;
  });

// Run associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
