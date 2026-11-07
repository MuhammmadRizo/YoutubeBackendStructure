import fs from "fs";
import { join } from "path";

const getAllUsers = (req, res) => {
  let allUsers = fs.readFileSync(
    join(process.cwd(), "src", "db", "users.json"),
    "utf-8",
  );
  allUsers = JSON.parse(allUsers)


  res.status(200).json({
    status: 200,
    message: "Userlar muvofaqiyatli topildi",
    data: allUsers
  });
};

export default getAllUsers;
