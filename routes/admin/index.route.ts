import { Application } from "express";
import { categoryRoutesAdmin } from "./category.route";
import { tourRoutesAdmin } from "./tour.route";
import { UploadRoutes } from "./upload.route";


export const routeAdmin=(app:Application)=>{
  const PATH_ADMIN='/admin'
  app.use(PATH_ADMIN+'/categories',categoryRoutesAdmin)
  app.use(PATH_ADMIN+'/tours',tourRoutesAdmin)
  app.use(PATH_ADMIN+'/upload',UploadRoutes)
}