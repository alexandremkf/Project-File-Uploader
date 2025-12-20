import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Storage do Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "file-uploader",
    resource_type: "auto",
    allowed_formats: ["jpg", "png", "pdf", "txt"],
  },
});

// Filtro de tipos (camada extra de segurança)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "text/plain",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não permitido"));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

export default upload;