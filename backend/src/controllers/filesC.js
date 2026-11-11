import { join } from "path";
import osFile from "../utils/fileSystem.js";

const getAllFiles = (req, res) => {
  let allFiles = osFile.read("files");

  res.status(200).json({
    status: 200,
    message: "Files founded",
    data: allFiles,
  });
};

const addNewFile = (req, res) => {
  const { videoInput } = req.body;
  const { viewFile } = req.files;

  const fileName = Date.now() + "." + viewFile.name.split(".")[1];

  let allFiles = osFile.read("files");

  const newFile = {
    fileId: allFiles.length ? allFiles.at(-1).fileId + 1 : 1,
    videoInput,
    viewFile: fileName,
    date: `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`,
    size: +(viewFile.size / (1024 * 1024)).toFixed(2),
    user: {
      userId: req.user.userId,
      username: req.user.username,
      profileImg: req.user.profileImg,
    },
  };

  allFiles.push(newFile);

  osFile.write("files", allFiles);

  viewFile.mv(join(process.cwd(), "src", "uploads", fileName), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(201).json({
    status: 201,
    message: "File successfully added",
    data: allFiles,
  });
};

const deleteFile = (req, res) => {
  const { fileId } = req.body;

  let allFiles = osFile.read("files");

  let filteredFiles = allFiles.filter((file) => file.fileId != fileId);

  osFile.write("files", filteredFiles);

  res.status(200).json({
    status: 200,
    message: "File deleted successfully",
  });
};

const updateFileName = (req, res) => {
  const { fileId, videoInput } = req.body;

  let allFiles = osFile.read("files");

  let filteredFile = allFiles.find((file) => file.fileId == fileId);

  filteredFile.videoInput = videoInput;

  osFile.write("files", allFiles);

  res.status(201).json({
    status: 201,
    message: "File successfully updated",
  });
};

const getFilesById = (req, res) => {
  const { userId } = req.params;

  let allFiles = osFile.read("files");

  let filteredFiles = allFiles.filter((file) => file.user.userId == userId);

  res.status(200).json({
    status: 200,
    message: "Founded",
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
