import { Application } from "express";
import { TourRoutes } from "./tour.route";
import { CateGoryRoutes } from "./category.route";
import { CartRoutes } from "./cart.route";

export const routeClient=(app:Application)=>{
  app.use("/tours",TourRoutes)
  app.use("/categories",CateGoryRoutes)
  app.use("/cart",CartRoutes)
}