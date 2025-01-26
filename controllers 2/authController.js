import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const userCount = await User.count({ where: {} });

  const isFirstAccount = userCount === 0;

  req.body.role = isFirstAccount ? "admin" : "superuser";
  req.body.email = req.body.email.toLowerCase();

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: "Gebruiker aangemaakt" });
};

export const login = async (req, res) => {
  const emailLookup = req.body.email.toLowerCase();
  const user = await User.findOne({ email: emailLookup });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser)
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Gebruikersnaam of wachtwoord verkeerd" });

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "U bent ingelogd!" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "U bent afgemeld" });
};
