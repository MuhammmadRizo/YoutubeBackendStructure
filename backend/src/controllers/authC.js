import fs from "fs";
import { join } from "path";

const authRegister = (req, res) => {
  const { username, password } = req.body;
  const { profileImg } = req.files;

  const fileName = Date.now() + "." + profileImg.name.split(".")[1];

  let allUsers = fs.readFileSync(
    join(process.cwd(), "src", "db", "users.json"),
    "utf-8",
  );
  allUsers = JSON.parse(allUsers);

  const newUser = {
    userId: allUsers.length ? allUsers.at(-1).userId + 1 : 1,
    username,
    password,
    profileImg: fileName,
  };

  allUsers.push(newUser);
  fs.writeFileSync(
    join(process.cwd(), "src", "db", "users.json"),
    JSON.stringify(allUsers, null, 4),
  );

  profileImg.mv(join(process.cwd(), "src", "uploads", fileName), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(201).json({
    status: 201,
    message: "Foydalanuvchi muvofaqiyatli qo'shildi",
    data: newUser,
  });
};

const authLogin = (req, res) => {
  let allUsers = fs.readFileSync(
    join(process.cwd(), "src", "db", "users.json"),
    "utf-8",
  );
  allUsers = JSON.parse(allUsers);

  res.send(allUsers);
};

export default {
  authRegister,
  authLogin,
};
