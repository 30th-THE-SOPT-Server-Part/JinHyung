import { Router } from "express";
import { FileController } from "../controller";
import upload from "../config/multer";

const router: Router = Router();

router.post('/upload', upload.array('file'), FileController.uploadFilesToS3);

export default router;