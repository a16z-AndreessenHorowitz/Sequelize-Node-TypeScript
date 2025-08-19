import { Router } from "express";
const route:Router =Router()

import * as controller from "../controllers/client/order.controller"

route.post("/",controller.order)

route.get("/success",controller.success)
  
export const OrderRoutes:Router=route