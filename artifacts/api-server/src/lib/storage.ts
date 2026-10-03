import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export interface ContactSubmission {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  websiteType: string;
  description: string;
  createdAt: string;
}

export interface UploadSubmission {
  id: number;
  filename: string;
  originalName: string;
  sizeBytes: number;
  comment: string;
  uploaderName?: string;
  uploaderContact?: string;
  createdAt: string;
}

function resolveStorageDirectories() {
  const desktopVexorq = "/Users/durga/Desktop/VEXORQ pvt.lmt";
  let baseDir = path.resolve(process.cwd(), "data");

  // Try Desktop first if writable (e.g. running locally on user's Mac)
  try {
    if (fs.existsSync("/Users/durga/Desktop")) {
      if (!fs.existsSync(desktopVexorq)) {
        fs.mkdirSync(desktopVexorq, { recursive: true });
      }
      baseDir = desktopVexorq;
    }
  } catch {
    baseDir = path.resolve(process.cwd(), "data");
  }

  // Ensure base directory exists
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
  } catch {
    baseDir = path.resolve(process.cwd(), "data");
    try {
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
      }
    } catch {
      // Ignore if cannot create
    }
  }

  const databaseDir = path.join(baseDir, "database");
  const uploadsDir = path.join(baseDir, "uploads");

  try {
    if (!fs.existsSync(databaseDir)) {
      fs.mkdirSync(databaseDir, { recursive: true });
    }
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (err) {
    console.warn("[Storage] Fallback warning creating subdirs:", err);
  }

  return {
    baseDir,
    databaseDir,
    uploadsDir,
    contactsJson: path.join(databaseDir, "contacts.json"),
    uploadsJson: path.join(databaseDir, "uploads.json"),
    contactsXlsx: path.join(baseDir, "contact_submissions.xlsx"),
    uploadsXlsx: path.join(databaseDir, "uploaded_documents.xlsx"),
  };
}

const paths = resolveStorageDirectories();

export function getUploadsDirectory(): string {
  return paths.uploadsDir;
}

export function getAllQueries(): ContactSubmission[] {
  try {
    if (fs.existsSync(paths.contactsJson)) {
      const data = fs.readFileSync(paths.contactsJson, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("[Storage] Error reading contacts.json:", err);
  }
  return [];
}

export function getAllUploads(): UploadSubmission[] {
  try {
    if (fs.existsSync(paths.uploadsJson)) {
      const data = fs.readFileSync(paths.uploadsJson, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("[Storage] Error reading uploads.json:", err);
  }
  return [];
}

function updateContactsExcel(contacts: ContactSubmission[]) {
  try {
    const rows = contacts.map((c) => ({
      ID: c.id,
      "Date & Time": c.createdAt,
      "Full Name": c.fullName,
      "Email Address": c.email,
      "Phone Number": c.phone,
      "Website Type": c.websiteType,
      "Project Details": c.description,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 22 },
      { wch: 20 },
      { wch: 26 },
      { wch: 18 },
      { wch: 18 },
      { wch: 40 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Submissions");
    XLSX.writeFile(workbook, paths.contactsXlsx);
    console.log(`[Storage] Updated Excel at ${paths.contactsXlsx}`);
  } catch (err) {
    console.error("[Storage] Error writing contacts Excel:", err);
  }
}

function updateUploadsExcel(uploads: UploadSubmission[]) {
  try {
    const rows = uploads.map((u) => ({
      ID: u.id,
      "Date & Time": u.createdAt,
      "Saved Filename": u.filename,
      "Original Name": u.originalName,
      "File Size (KB)": Math.round(u.sizeBytes / 1024),
      "User Comment": u.comment,
      "Uploader Name": u.uploaderName || "N/A",
      "Uploader Contact": u.uploaderContact || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 22 },
      { wch: 25 },
      { wch: 25 },
      { wch: 15 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Uploaded Documents");
    XLSX.writeFile(workbook, paths.uploadsXlsx);
    console.log(`[Storage] Updated Excel at ${paths.uploadsXlsx}`);
  } catch (err) {
    console.error("[Storage] Error writing uploads Excel:", err);
  }
}

export function saveContactSubmission(data: {
  fullName: string;
  email: string;
  phone: string;
  websiteType: string;
  description: string;
}): ContactSubmission {
  const existing = getAllQueries();
  const newId = existing.length > 0 ? Math.max(...existing.map((e) => e.id)) + 1 : 1;

  const now = new Date();
  const formattedDate = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const record: ContactSubmission = {
    id: newId,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    websiteType: data.websiteType,
    description: data.description,
    createdAt: formattedDate,
  };

  existing.push(record);
  fs.writeFileSync(paths.contactsJson, JSON.stringify(existing, null, 2), "utf-8");
  updateContactsExcel(existing);

  return record;
}

export function saveUploadSubmission(data: {
  filename: string;
  originalName: string;
  sizeBytes: number;
  comment: string;
  uploaderName?: string;
  uploaderContact?: string;
}): UploadSubmission {
  const existing = getAllUploads();
  const newId = existing.length > 0 ? Math.max(...existing.map((e) => e.id)) + 1 : 1;

  const now = new Date();
  const formattedDate = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const record: UploadSubmission = {
    id: newId,
    filename: data.filename,
    originalName: data.originalName,
    sizeBytes: data.sizeBytes,
    comment: data.comment,
    uploaderName: data.uploaderName,
    uploaderContact: data.uploaderContact,
    createdAt: formattedDate,
  };

  existing.push(record);
  fs.writeFileSync(paths.uploadsJson, JSON.stringify(existing, null, 2), "utf-8");
  updateUploadsExcel(existing);

  return record;
}

export function getContactsExcelBuffer(): Buffer {
  const contacts = getAllQueries();
  const rows = contacts.map((c) => ({
    ID: c.id,
    "Date & Time": c.createdAt,
    "Full Name": c.fullName,
    "Email Address": c.email,
    "Phone Number": c.phone,
    "Website Type": c.websiteType,
    "Project Details": c.description,
  }));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Submissions");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

export function getUploadsExcelBuffer(): Buffer {
  const uploads = getAllUploads();
  const rows = uploads.map((u) => ({
    ID: u.id,
    "Date & Time": u.createdAt,
    "Saved Filename": u.filename,
    "Original Name": u.originalName,
    "File Size (KB)": Math.round(u.sizeBytes / 1024),
    "User Comment": u.comment,
    "Uploader Name": u.uploaderName || "N/A",
    "Uploader Contact": u.uploaderContact || "N/A",
  }));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Uploaded Documents");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

export function clearAllStorage() {
  try {
    fs.writeFileSync(paths.contactsJson, "[]", "utf-8");
    fs.writeFileSync(paths.uploadsJson, "[]", "utf-8");
    if (fs.existsSync(paths.uploadsDir)) {
      const files = fs.readdirSync(paths.uploadsDir);
      for (const file of files) {
        if (file.toLowerCase().endsWith(".jpg") || file.toLowerCase().endsWith(".jpeg")) {
          try {
            fs.unlinkSync(path.join(paths.uploadsDir, file));
          } catch {}
        }
      }
    }
    updateContactsExcel([]);
    updateUploadsExcel([]);
    console.log("[Storage] Successfully cleared all database records and uploaded images.");
  } catch (err) {
    console.error("[Storage] Error clearing storage:", err);
  }
}

