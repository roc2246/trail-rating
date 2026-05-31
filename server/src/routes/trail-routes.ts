import express from "express";
import * as controller from "../controllers";

const router = express.Router();

router.get(
  "/",
  controller.getAllTrailsController
);

router.get(
  "/:id",
  controller.getTrailByIdController
);

router.post(
  "/",
  controller.createTrailController
);

router.patch(
  "/:id",
  controller.updateTrailController
);

router.delete(
  "/:id",
  controller.deleteTrailController
);

export default router;