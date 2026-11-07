import fs from "fs";
import { join } from "path";

const getAllFiles = (req, res) => {
  let allFiles = fs.readFileSync(
    join(process.cwd(), "src", "db", "files.json"),
    "utf-8",
  );
  allFiles = JSON.parse(allFiles);

  res.status(200).json({
    status: 200,
    message: "Filelar muvofaqiyatli topildi",
    data: allFiles,
  });
};

export default getAllFiles;
