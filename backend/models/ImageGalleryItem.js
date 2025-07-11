module.exports = (sequelize, DataTypes) => {
  const ImageGalleryItem = sequelize.define(
    "ImageGalleryItem",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      categoryId: {
        type: DataTypes.INTEGER,
        references: { model: "categories", key: "id" }, // Reference correct table
        allowNull: false,
      },
      image: { type: DataTypes.TEXT("long"), allowNull: false },
    },
    {
      tableName: "gallery_imagees", // Use your actual images table name here
      timestamps: false,
    },
  );

  ImageGalleryItem.associate = (models) => {
    ImageGalleryItem.belongsTo(models.GalleryCategory, {
      foreignKey: "categoryId",
      as: "category",
    });
  };

  return ImageGalleryItem;
};
