import express from "express";
import getUsers from "../controllers/users.controller.js";
import validate from "../middleware/validate.js";
import userValidationSchema from "../validation/user.validation.js";

const router = express.Router();

router.get("/", validate(userValidationSchema), getUsers);

export default router;
