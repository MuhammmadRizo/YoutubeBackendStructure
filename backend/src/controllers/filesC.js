import fs from "fs";
import { join } from "path";

const FILES_PATH = join(process.cwd(), "src", "db", "files.json");
const USERS_PATH = join(process.cwd(), "src", "db", "users.json");

const getAllFiles = (req, res) => {
  let allFiles = fs.readFileSync(FILES_PATH, "utf-8");
  allFiles = JSON.parse(allFiles);

  res.status(200).json({
    status: 200,
    message: "Filelar muvofaqiyatli topildi",
    data: allFiles,
  });
};

const addNewFile = (req, res) => {
  const { videoInput, username } = req.body;
  const { viewFile } = req.files;

  const fileName = Date.now() + "." + viewFile.name.split(".")[1];

  let allFiles = fs.readFileSync(FILES_PATH, "utf-8");
  allFiles = JSON.parse(allFiles);

  let allUsers = fs.readFileSync(USERS_PATH, "utf-8");
  allUsers = JSON.parse(allUsers);

  let filterdUser = allUsers.find((user) => user.username == username);

  if (!filterdUser) {
    return res.status(400).json({
      status: 400,
      message: "User afsuski topilmadi",
    });
  }

  const newFile = {
    fileId: allFiles.length ? allFiles.at(-1).fileId + 1 : 1,
    videoInput,
    viewFile: fileName,
    date: new Date().toLocaleDateString(),
    size: +(viewFile.size / (1024 * 1024)).toFixed(2),
    user: filterdUser,
  };

  allFiles.push(newFile);
  fs.writeFileSync(FILES_PATH, JSON.stringify(allFiles, null, 4));

  viewFile.mv(join(process.cwd(), "src", "uploads", fileName), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(201).json({
    status: 201,
    message: "Fayl muvofaqiyatli qo'shildi",
    data: allFiles,
  });
};

const deleteFile = (req, res) => {
  const { fileId } = req.body;

  let allFiles = fs.readFileSync(FILES_PATH, "utf-8");
  allFiles = JSON.parse(allFiles);

  let filteredFiles = allFiles.filter((file) => file.fileId != fileId);

  fs.writeFileSync(FILES_PATH, JSON.stringify(filteredFiles, null, 4));

  res.status(200).json({
    status: 200,
    message: "File o'chirildi",
  });
};

const updateFileName = (req, res) => {
  const { fileId, videoInput } = req.body;

  let allFiles = fs.readFileSync(FILES_PATH, "utf-8");
  allFiles = JSON.parse(allFiles);

  let filteredFile = allFiles.find((file) => file.fileId == fileId);

  filteredFile.videoInput = videoInput;

  fs.writeFileSync(FILES_PATH, JSON.stringify(allFiles, null, 4));

  res.status(201).json({
    status: 201,
    message: "File yangilandi",
  });
};

const getFilesById = (req, res) => {
  const { userId } = req.params;

  let allFiles = fs.readFileSync(FILES_PATH, "utf-8");
  allFiles = JSON.parse(allFiles);

  let filteredFiles = allFiles.filter((file) => file.user.userId == userId);

  res.status(200).json({
    status: 200,
    message: "Topildi",
    data: filteredFiles,
  });
};

export default {
  getAllFiles,
  addNewFile,
  deleteFile,
  updateFileName,
  getFilesById,
};
