import express from "express";
import * as controller from "../controllers";

const router = express.Router();

router.get(
  "/",
  controller.getAllMountainsController
);

router.get(
  "/:id",
  controller.getMountainByIdController
);

router.post(
  "/",
  controller.createMountainController
);

router.patch(
  "/:id",
  controller.updateMountainController
);

router.delete(
  "/:id",
  controller.deleteMountainController
);

export default router;