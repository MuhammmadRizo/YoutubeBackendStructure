import osFile from "../utils/fileSystem.js";

const getAllUsers = (req, res) => {
  let allUsers = osFile.read("users");

  res.status(200).json({
    status: 200,
    message: "Users successfully founded",
    data: allUsers,
  });
};

export default getAllUsers;
