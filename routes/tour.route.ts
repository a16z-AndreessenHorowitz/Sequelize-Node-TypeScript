import { Router } from "express";
const route:Router =Router()

import * as controller from "../controllers/client/tour.controller"

route.get("/:slugCategory",controller.index)
  
route.get("/detail/:slugTour",controller.detail)

export const TourRoutes:Router=route