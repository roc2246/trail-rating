import express from "express";
import * as controller from "../controllers";

const router = express.Router();

router.post(
  "/login",
  controller.loginController
);

router.post(
  "/register",
  controller.registerController
);

router.post(
  "/logout",
  controller.logoutController
);

export default router;