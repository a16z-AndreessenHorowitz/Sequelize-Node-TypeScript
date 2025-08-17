import { Request, Response } from 'express';
import Tour from '../../models/tour.model';

// [GET] /cart
export const index = async (req: Request, res: Response) => {

  res.render("client/pages/cart/index",{
    pageTitle:"Giỏ hàng"
  })
}

// [GET] /cart/list-json
export const listJson = async (req: Request, res: Response) => {
  const tours=req.body
  for (const tour of tours) {
    const infoTour=await Tour.findOne({
      where:{
        id:tour.tourId,
        deleted:false,
        status:"active"
      },
      raw:true
    })
    
    tour["info"]=infoTour
    //lấy ra ảnh đầu tiên để hiển thị trang giỏ hàng
    tour["image"]=JSON.parse(infoTour["images"])[0]
    //tính giá sản phẩm đã dc discount
    tour["price-special"]=infoTour["price"]*(1-infoTour["discount"]/100)
    //tính tổng tiền
    tour["total"]=tour["price-special"]*tour["quantity"] 
  }

  res.json({
    tour:tours
  })
}
