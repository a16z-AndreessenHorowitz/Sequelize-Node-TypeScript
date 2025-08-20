import { Router } from "express";
const route:Router =Router()

import * as controller from "../../controllers/admin/tour.controller"

route.get("/",controller.index)

route.get("/create",controller.create)
route.post("/create",controller.createPost)
  
export const tourRoutesAdmin:Router=route