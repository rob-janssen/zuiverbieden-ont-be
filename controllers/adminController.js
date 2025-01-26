import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(StatusCodes.OK).json({ users });
};
