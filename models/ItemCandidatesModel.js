import { DataTypes } from "sequelize";
import sequelize from "../utils/dbConfig.js";
import Item from "./ItemModel.js";
import Candidate from "./CandidateModel.js";

const ItemCandidates = sequelize.define("ItemCandidates", {
  role: {
    type: DataTypes.ENUM("buyer", "seller"),
    allowNull: false,
  },
});

Item.belongsToMany(Candidate, {
  foreignKey: "item_id",
  otherKey: "candidate_id",
  through: ItemCandidates,
});

Candidate.belongsToMany(Item, {
  through: ItemCandidates,
  foreignKey: "candidate_id",
  otherKey: "item_id",
});

export default ItemCandidates;
