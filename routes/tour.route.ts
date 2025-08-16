import { Router } from "express";
const route:Router =Router()

import * as controller from "../controllers/client/tour.controller"

route.get("/",controller.index)
  
export const TourRoutes:Router=route