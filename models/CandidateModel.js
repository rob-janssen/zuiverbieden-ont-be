import { DataTypes } from "sequelize";
import sequelize from "../utils/dbConfig.js";

const Candidate = sequelize.define(
  "Candidate",
  {
    candidate_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    disableOnDate: {
      type: DataTypes.DATE,
      //   todo: aanpassen?
      allowNull: true,
    },
    bidlog: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Candidate;
