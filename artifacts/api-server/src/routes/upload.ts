import { Router, type IRouter, type Request, type Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  saveUploadSubmission,
  getAllUploads,
  getUploadsDirectory,
  getUploadsExcelBuffer,
} from "../lib/storage";

const router: IRouter = Router();

const uploadsDir = getUploadsDirectory();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const timestamp = Date.now();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 30);
    cb(null, `${cleanName}_${timestamp}${ext}`);
  },
});

// Strictly allow JPG / JPEG only
const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB limit
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isJpgExt = ext === ".jpg" || ext === ".jpeg";
    const isJpgMime = file.mimetype === "image/jpeg" || file.mimetype === "image/pjpeg";

    if (isJpgExt && isJpgMime) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG / JPEG images (photos/screenshots) are permitted."));
    }
  },
});

// POST /api/upload
router.post("/upload", (req: Request, res: Response) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        error: err.message || "Failed to upload file. Ensure it is a valid JPG/JPEG image.",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "Please select a JPG screenshot or photo to upload.",
      });
      return;
    }

    const comment = (req.body.comment || "").trim();
    const uploaderName = (req.body.name || req.body.fullName || "").trim();
    const uploaderContact = (req.body.contact || req.body.email || req.body.phone || "").trim();

    try {
      const record = saveUploadSubmission({
        filename: req.file.filename,
        originalName: req.file.originalname,
        sizeBytes: req.file.size,
        comment,
        uploaderName,
        uploaderContact,
      });

      res.status(201).json({
        success: true,
        message: "Screenshot / Photo uploaded successfully!",
        data: record,
      });
    } catch (saveErr) {
      console.error("[Upload] Error saving submission metadata:", saveErr);
      res.status(500).json({
        success: false,
        error: "Image was uploaded but failed to update records.",
      });
    }
  });
});

// GET /api/uploads - list all uploads
router.get("/uploads", (_req: Request, res: Response) => {
  const uploads = getAllUploads();
  res.json({
    success: true,
    total: uploads.length,
    data: uploads,
  });
});

// GET /api/uploads/file/:filename - serve the uploaded image
router.get("/uploads/file/:filename", (req: Request, res: Response) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "Image file not found" });
    return;
  }

  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(filePath);
});

// GET /api/export/uploads - download Excel file
router.get("/export/uploads", (_req: Request, res: Response) => {
  try {
    const buffer = getUploadsExcelBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="VEXORQ_Uploaded_Documents.xlsx"',
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate Excel file" });
  }
});

export default router;
