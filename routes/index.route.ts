import { Application } from "express";
import { TourRoutes } from "./tour.route";

export const routeClient=(app:Application)=>{
  app.use("/tours",TourRoutes)
}