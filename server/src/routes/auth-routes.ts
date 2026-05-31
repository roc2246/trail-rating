import express from "express";
import * as controller from "../controllers";
import * as middleware from "../middleware";
import * as validation from "../validation";

const router = express.Router();

router.post(
  "/register",
  middleware.validateBody(validation.registerSchema),
  controller.registerController
);

router.post(
  "/login",
  middleware.validateBody(validation.loginSchema),
  controller.loginController
);

router.post(
  "/logout",
  middleware.requireAuth,
  controller.logoutController
);

export default router;