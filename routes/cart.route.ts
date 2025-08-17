import { Router } from "express";
const route:Router =Router()

import * as controller from "../controllers/client/cart.controller"

route.get("/",controller.index)
  
export const CartRoutes:Router=route