import express from "express";
import * as controller from "../controllers";
import * as middleware from "../middleware";

const router = express.Router();

router.post(
  "/register",
  middleware.requireBodyFields(["username", "email", "password"]),
  controller.registerController
);

router.post(
  "/login",
  middleware.requireBodyFields(["email", "password"]),
  controller.loginController
);

router.post(
  "/logout",
  middleware.requireAuth,
  controller.logoutController
);

export default router;