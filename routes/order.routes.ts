import { Router } from "express";
const route:Router =Router()

import * as controller from "../controllers/client/order.controller"

route.post("/",controller.order)
  
export const OrderRoutes:Router=route