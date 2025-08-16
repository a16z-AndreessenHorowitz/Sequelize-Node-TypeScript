import { Request, Response } from 'express';
import Tour from '../../models/tour.model';
import sequelize from '../../config/database';
import { QueryTypes } from 'sequelize';

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  // SELECT tours.*,
  //   price * (1 - discount / 100) AS price_special
  // FROM tours
  // JOIN tours_categories ON tours.id = tours_categories.tour_id
  // JOIN categories ON tours_categories.category_id = categories.id
  // WHERE categories.slug = 'du-lich-trong-nuoc'
  //   AND categories.deleted = false
  //   AND categories.status = 'active'
  //   AND tours.deleted = false
  //   AND tours.status = 'active';
  const slugCategory=req.params.slugCategory
  
  //đứng từ database để làm hàm đó cho đơn giản (hàm squelize)
  const tours=await sequelize.query(`
  SELECT tours.*, ROUND(price * (1 - discount / 100) , 0) AS price_special
  FROM tours
  JOIN tours_categories ON tours.id = tours_categories.tour_id
  JOIN categories ON tours_categories.category_id = categories.id
  WHERE categories.slug = '${slugCategory}'
    AND categories.deleted = false
    AND categories.status = 'active'
    AND tours.deleted = false
    AND tours.status = 'active';
  `,{
    type:QueryTypes.SELECT
  })  //2 định nghĩa kiểu muốn lấy

  //Lấy ra 1 ảnh đầu thui để hiện lên view
  tours.forEach(tour => {
    if(tour["images"]){ //nếu có tồn tại
      const images=JSON.parse(tour["images"]) //tour["image"] đang dạng chuỗi
      tour["image"]=images[0]
    }
    //chuyển giá lại thành số
    tour["price_special"]=parseFloat(tour["price_special"])
  });
  console.log(tours)
  res.render("client/pages/tours/index", {
    pageTitle: "Trang danh sách Tours",
    tours:tours
  })
}

export const detail=async (req:Request, res:Response)=>{
  const slugTour=req.params.slugTour
  const tourDetail=await Tour.findOne({
    where:{
      slug:slugTour,
      deleted:false,
      status:"active"
    },
    raw:true
  })

  //chuyển đổi cái image thành mảng
  if(tourDetail["images"]){
    tourDetail["images"]=JSON.parse(tourDetail["images"])
  }
  //làm giá mới
  tourDetail["price_special"]=tourDetail["price"]* (1-tourDetail["discount"]/100)

  console.log(tourDetail)
  res.render("client/pages/tours/detail",{
    pageTitle:"Chi tiết tour",
    tourDetail:tourDetail
  })
}