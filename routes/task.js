import express from "express";
import { allTasks, deleteTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/new').post(isAuthenticated, newTask)

router.route("/all").get(isAuthenticated, allTasks)

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default router