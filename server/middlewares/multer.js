import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cd) {
    cd(null, "uploads");
  },
  filename(req, file, cd) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    const filename = `${id}.${extName}`;
    cd(null, filename);
  },
});

export const uploadfiles = multer({ storage }).single("file");
