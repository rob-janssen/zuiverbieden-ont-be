import { DataTypes } from "sequelize";
import sequelize from "../utils/dbConfig.js";

const User = sequelize.define(
  "User",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("superuser", "admin"),
      defaultValue: "superuser",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
