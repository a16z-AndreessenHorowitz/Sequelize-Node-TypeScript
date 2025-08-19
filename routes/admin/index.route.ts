import { Application } from "express";
import { categoryRoutesAdmin } from "./category.route";


export const routeAdmin=(app:Application)=>{
  const PATH_ADMIN='/admin'
  app.use(PATH_ADMIN+'/categories',categoryRoutesAdmin)
}