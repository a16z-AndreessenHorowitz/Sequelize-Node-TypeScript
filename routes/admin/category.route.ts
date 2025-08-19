import { Router } from "express";
const route:Router =Router()

import * as controller from "../../controllers/admin/category.controller"

route.get("/",controller.index)

  
export const categoryRoutesAdmin:Router=route