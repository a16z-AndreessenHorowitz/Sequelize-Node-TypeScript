import { Router } from "express";
const route:Router =Router()
import multer from "multer"

import * as controller from "../../controllers/admin/tour.controller"
import * as uploadCloud from "../../helpers/uploadCloud.middleware"
const upload=multer()

route.get("/",controller.index)

route.get("/create",controller.create)
route.post("/create",
  upload.fields([{ name: 'images', maxCount: 10 }]),
  uploadCloud.uploadFields,
  controller.createPost
)
  
export const tourRoutesAdmin:Router=route