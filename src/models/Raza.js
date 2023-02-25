const { DataTypes, STRING } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Raza",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:"https://www.semana.com/resizer/gMKLSQsT3KHsG8lRe6W2dO2ZRsI=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/JEL7VU6HA5FMRLC7NJZXA53Z5I.jpg",
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      peso_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      peso_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      años_de_vida: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
