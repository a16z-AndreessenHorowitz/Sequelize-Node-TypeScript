import { Router } from "express";
const route:Router =Router()

import * as controller from "../../controllers/admin/tour.controller"

route.get("/",controller.index)

  
export const tourRoutesAdmin:Router=route