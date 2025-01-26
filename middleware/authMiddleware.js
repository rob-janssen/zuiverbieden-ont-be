import { verifyJWT } from "../utils/tokenUtils.js";
import { StatusCodes } from "http-status-codes";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Geen toegang" });

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Geen toegang" });
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "U hebt onvoldoende gebruikersrechten" });
    }
    next();
  };
};
