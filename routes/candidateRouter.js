import { Router } from "express";
const router = Router();
import rateLimiter from "express-rate-limit";

import {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  attachCandidateToItem,
} from "../controllers/candidateController.js";

import {
  authorizePermissions,
  authenticateUser,
} from "../middleware/authMiddleware.js";

const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15,
  message: { messagee: "Maximale pogingen bereikt. Wacht 10 minuten." },
});

router.get(
  "/all",
  apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  getAllCandidates
);
router.get(
  "/:id",
  apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  getCandidateById
);
router.post(
  "/",
  apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  createCandidate
);

router.put(
  "/:id",
  apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  updateCandidate
);
router.delete(
  "/:id",
  apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  deleteCandidate
);
router.post(
  "/:candidateId/attach",
  apiLimiter,
  authenticateUser,
  authorizePermissions("admin", "superuser"),
  attachCandidateToItem
);

export default router;
