import { Router } from "express";
const router = Router();
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import { createTask } from "#db/queries/tasks";

router.use(requireUser);

router.post("/", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;
  const newTask = await createTask({ userId: req.user.id, title, done });
  res.status(201).json(newTask);
});

export default router;
