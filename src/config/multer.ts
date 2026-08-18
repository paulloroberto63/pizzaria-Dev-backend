import multer from "multer";

export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 4 * 1024 * 1024, // 
    },
    fileFilter: (_: any, file: Express.Multer.File, cb: any) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/JPG"];
        
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Formato de arquivo invalido, use apenas JPG, JPEG, PNG"));
        }
    }
}