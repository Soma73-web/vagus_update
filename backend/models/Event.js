module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "general",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      addedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "events",
      timestamps: true,
    },
  );

  return Event;
};
