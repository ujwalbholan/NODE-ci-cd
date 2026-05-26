import express from "express";
import usersRoute from "./src/routes/users.route.js";

const app = express();
const PORT = "3000" || process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ok",
  });
});

app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
