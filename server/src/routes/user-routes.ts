import express from "express";
import * as controller from "../controllers";
import * as middleware from "../middleware";
import * as validation from "../validation";

const router = express.Router();

router.post(
  "/",
  middleware.validateBody(validation.createUserSchema),
  controller.createUserController
);

router.get("/:id", middleware.requireAuth, controller.getUserByIdController);

router.get(
  "/email/:email",
  middleware.requireAuth,
  controller.getUserByEmailController
);

router.patch(
  "/:id",
  middleware.requireAuth,
  middleware.validateBody(validation.updateUserSchema),
  controller.updateUserController
);

router.delete(
  "/:id",
  middleware.requireAuth,
  controller.deleteUserController
);

export default router;