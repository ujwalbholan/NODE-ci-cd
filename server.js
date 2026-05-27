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

app.get("/user", (req, res) => {
  const id = req.query.id;

  const query = "SELECT * FROM users WHERE id = " + id;

  db.execute(query);
});

app.listen(PORT, () => {
  console.log(new Date());
  console.log(`server is listening at http://localhost:${PORT}`);
});
