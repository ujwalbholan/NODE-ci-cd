import express from "express";
import usersRoute from "./src/routes/users.route.js";
import rateLimit from "express-rate-limit";
import { execFile } from "node:child_process";

const app = express();

const PORT = process.env.PORT || "3000";
app.disable("x-powered-by");

const limit = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 30,
});

const allowedTasks = {
  nodeVersion: {
    command: "node",
    args: ["--version"],
  },
  npmVersion: {
    command: "npm",
    args: ["--version"],
  },
};

app.use(express.json());
app.use(limit);

app.get("/", (req, res) => {
  res.json({
    message: "ok",
  });
});

app.use("/users", usersRoute);

app.get("/run", (req, res) => {
  const task = req.query.task;

  if (typeof task !== "string" || !allowedTasks[task]) {
    return res.status(400).json({ error: "Invalid task" });
  }

  const { command, args } = allowedTasks[task];

  execFile(command, args, { shell: false }, (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: "Command execution failed" });
    }

    return res.json({ output: stdout.trim() });
  });
});

app.listen(PORT, () => {
  console.log(new Date());
  console.log(`server is listening at http://localhost:${PORT}`);
});
