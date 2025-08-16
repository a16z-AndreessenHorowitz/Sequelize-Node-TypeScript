import { Request, Response } from 'express';
import Tour from '../../models/tour.model';

// [GET] /tours/
export const index = async (req: Request, res: Response) => {
  //SELECT * FROM tours WHERE deleted=false AND status="active"
  const tour = await Tour.findAll({
    where:{
      deleted:false,
      status:"active"
    },
    raw: true
  })
  console.log(tour)
  res.render("client/pages/tours/index", {
    tours: tour
  })
}