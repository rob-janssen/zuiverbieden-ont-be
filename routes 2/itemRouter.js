import { Router } from "express";
const router = Router();
import rateLimiter from "express-rate-limit";
import {
  authorizePermissions,
  authenticateUser,
} from "../middleware/authMiddleware.js";

import {
  getAllItems,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
} from "../controllers/itemController.js.js";

const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15,
  message: { messagee: "Maximale pogingen bereikt. Wacht 10 minuten." },
});

// Todo: Add apilimiter middleware to limit the amount of requests

router.get(
  "/allitems",
  // apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  getAllItems
);
router.get(
  "/:id",
  // apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  getItemById
);
router.post(
  "/",
  // apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  createItem
);
router.put(
  "/:id",
  // apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  updateItem
);
router.delete(
  "/:id",
  // apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  deleteItem
);

export default router;
