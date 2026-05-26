
const getUsers = (req, res) => {
  const user = req.body;

  res.status(200).json({
    message: "user created successfully",
    user,
  });
};

export default getUsers;
