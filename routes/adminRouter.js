import { Router } from "express";
const router = Router();
import rateLimiter from "express-rate-limit";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

import { getAllUsers } from "../controllers/adminController.js";

const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message: { messagee: "Maximale pogingen bereikt. Wacht 10 minuten." },
});

router.get(
  "/allusers",
  // apiLimiter,
  // Todo: add apilimiter middleware to limit the amount of requests
  authenticateUser,
  authorizePermissions("admin"),
  getAllUsers
);

export default router;
