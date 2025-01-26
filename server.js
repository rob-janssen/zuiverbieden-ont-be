// import "express-async-errors";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
const app = express();

import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// routers
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import itemRouter from "./routes/itemRouter.js";

// public

// middleware
// Todo: import and configure middleware
// import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Test route" });
});

// Use of routers and middleware
// Todo: use routers and middleware
app.use("/api/v1/admin", authenticateUser, adminRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", itemRouter);

// error route
app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
