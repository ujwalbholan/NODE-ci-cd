import express from "express";
import usersRoute from "./src/routes/users.route.js";
import rateLimit from "express-rate-limit";
import { execFile } from "child_process";

const app = express();
const PORT = "3000" || process.env.PORT;

const limit = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 30,
});

console.log("ok");
app.use(express.json());
app.use(limit);

app.get("/", (req, res) => {
  res.json({
    message: "ok",
  });
});

app.use("/users", usersRoute);

app.get("/run", (req, res) => {
  const allowedCommands = new Set(["node", "npm"]);
  const cmd = req.query.cmd;
  const rawArgs = req.query.args;

  if (typeof cmd !== "string" || !allowedCommands.has(cmd)) {
    return res.status(400).json({ error: "Invalid command" });
  }

  let args = [];
  if (Array.isArray(rawArgs)) {
    args = rawArgs.filter((arg) => typeof arg === "string");
  } else if (typeof rawArgs === "string" && rawArgs.length > 0) {
    args = rawArgs.trim().split(/\s+/);
  }

  execFile(cmd, args, (error) => {
    if (error) {
      return res.status(500).json({ error: "Command execution failed" });
    }

    return res.send("done");
  });
});

app.listen(PORT, () => {
  console.log(new Date());
  console.log(`server is listening at http://localhost:${PORT}`);
});
