import { Router } from "express";
const route:Router =Router()

import * as controller from "../controllers/client/category.controller"

route.get("/",controller.index)
  
export const CateGoryRoutes:Router=route