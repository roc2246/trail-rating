import express from "express";
import * as controller from "../controllers";
import * as middleware from "../middleware";
import * as validation from "../validation";

const router = express.Router();

router.get("/", controller.getAllTrailsController);
router.get("/:id", controller.getTrailByIdController);

router.post(
  "/",
  middleware.requireAuth,
  middleware.validateBody(validation.createTrailSchema),
  controller.createTrailController
);

router.patch(
  "/:id",
  middleware.requireAuth,
  middleware.validateBody(validation.updateTrailSchema),
  controller.updateTrailController
);

router.delete(
  "/:id",
  middleware.requireAuth,
  controller.deleteTrailController
);

export default router;