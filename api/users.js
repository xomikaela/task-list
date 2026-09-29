import { Router } from "express";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import { createUser, getUserByUsernameandPassword } from "#db/queries/users";
const router = Router();

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const newUser = await createUser({ username, password });
    const token = createToken({ id: newUser.id });
    res.status(201).send(token);
  },
);
router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameandPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password");

    const token = createToken({ id: user.id });
    res.send(token);
  },
);

export default router;
