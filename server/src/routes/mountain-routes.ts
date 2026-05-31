import express from "express";
import * as controller from "../controllers";
import * as middleware from "../middleware";
import * as validation from "../validation";

const router = express.Router();

router.get("/", controller.getAllMountainsController);
router.get("/:id", controller.getMountainByIdController);

router.post(
  "/",
  middleware.requireAuth,
  middleware.validateBody(validation.createMountainSchema),
  controller.createMountainController
);

router.patch(
  "/:id",
  middleware.requireAuth,
  middleware.validateBody(validation.updateMountainSchema),
  controller.updateMountainController
);

router.delete(
  "/:id",
  middleware.requireAuth,
  controller.deleteMountainController
);

export default router;