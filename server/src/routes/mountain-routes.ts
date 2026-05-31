import express from "express";
import * as controller from "../controllers";
import * as middleware from "../middleware";

const router = express.Router();

router.get("/", controller.getAllMountainsController);
router.get("/:id", controller.getMountainByIdController);

router.post("/", middleware.requireAuth, controller.createMountainController);
router.patch(
  "/:id",
  middleware.requireAuth,
  controller.updateMountainController,
);
router.delete(
  "/:id",
  middleware.requireAuth,
  controller.deleteMountainController,
);

export default router;
