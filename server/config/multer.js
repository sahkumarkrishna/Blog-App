import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory

function fileFilter(req, file, cb) {
  const allowedFileTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/webp",
  ];

  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(new Error("Only images are allowed"), false);
  }

  cb(null, true);
}

const upload = multer({ storage, fileFilter });

export default upload;
