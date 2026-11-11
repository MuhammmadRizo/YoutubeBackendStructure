import argon from "argon2";
import JWT from "jsonwebtoken";
import { join } from "path";
import osFile from "../utils/fileSystem.js";

const authRegister = async (req, res) => {
  const { username, password } = req.body;
  const { profileImg } = req.files;

  const passHash = await argon.hash(password);
  const fileName = Date.now() + "." + profileImg.name.split(".")[1];

  let allUsers = osFile.read("users");

  let foundUser = allUsers.find((user) => user.username == username);

  console.log(foundUser);

  if (foundUser) {
    return res.status(409).json({
      status: 409,
      message: "This username already exist please change",
    });
  }

  const newUser = {
    userId: allUsers.length ? allUsers.at(-1).userId + 1 : 1,
    username,
    password: passHash,
    profileImg: fileName,
  };

  allUsers.push(newUser);
  osFile.write("users", allUsers);

  profileImg.mv(join(process.cwd(), "src", "uploads", fileName), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(201).json({
    status: 201,
    message: "User successfully added",
    accessToken: JWT.sign(
      {
        userId: newUser.userId,
        username: newUser.username,
        profileImg: newUser.profileImg,
        role: "ADMIN",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" },
    ),
    refreshToken: JWT.sign(
      {
        id: newUser.userId,
        username: newUser.username,
        profileImg: newUser.profileImg,
        role: "ADMIN",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    ),
    data: newUser,
  });
};

const authLogin = async (req, res) => {
  const { username, password } = req.body;

  let allUsers = osFile.read("users");

  let existUser = allUsers.find((user) => user.username == username);

  if (!existUser) {
    return res.status(400).json({
      status: 400,
      message: "Username or password is invalid",
    });
  }

  if (!(await argon.verify(existUser.password, password))) {
    return res.status(400).json({
      status: 400,
      message: "Username or password is invalid",
    });
  }

  res.status(201).json({
    status: 201,
    message: "User successfully logined",
    accessToken: JWT.sign(
      {
        userId: existUser.userId,
        username: existUser.username,
        profileImg: existUser.profileImg,
        role: "ADMIN",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" },
    ),
    refreshToken: JWT.sign(
      {
        id: existUser.userId,
        username: existUser.username,
        profileImg: existUser.profileImg,
        role: "ADMIN",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    ),
    data: existUser,
  });
};

export default {
  authRegister,
  authLogin,
};
