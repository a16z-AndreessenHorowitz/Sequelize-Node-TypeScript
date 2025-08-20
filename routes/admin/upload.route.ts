import { Router } from "express";
const route:Router=Router();

import multer from "multer"
import * as uploadCloud from "../../helpers/uploadCloud.middleware"
const upload = multer()

import * as controller from "../../controllers/admin/upload.controller"

route.post("/",
  upload.single('file'),
  uploadCloud.uploadSingle,
  controller.index
)

export const UploadRoutes:Router=route