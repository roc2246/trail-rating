import express from "express";
import * as controller from "../controllers";

const router = express.Router();

router.post(
  "/",
  controller.createUserController
);

router.get(
  "/:id",
  controller.getUserByIdController
);

router.get(
  "/email/:email",
  controller.getUserByEmailController
);

router.patch(
  "/:id",
  controller.updateUserController
);

router.delete(
  "/:id",
  controller.deleteUserController
);

export default router;