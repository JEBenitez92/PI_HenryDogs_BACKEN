const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Temperamento",{
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
         
            },
            nombre : {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false }
    )
};