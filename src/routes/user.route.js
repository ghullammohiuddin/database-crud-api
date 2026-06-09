import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserbyId,
  deleteUserbyId,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserbyId);
router.delete("/users/:id", deleteUserbyId);

export default router;
