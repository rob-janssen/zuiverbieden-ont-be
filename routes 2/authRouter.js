import { Router } from "express";
const router = Router();
import rateLimiter from "express-rate-limit";

import { login, logout, register } from "../controllers/authController.js";

const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15,
  message: { messagee: "Maximale pogingen bereikt. Wacht 10 minuten." },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.get("/logout", apiLimiter, logout);

export default router;
