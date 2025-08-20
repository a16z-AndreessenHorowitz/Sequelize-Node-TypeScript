import { Request, Response } from 'express';
import Tour from '../../models/tour.model';
import Category from '../../models/category.model';
import { generateTourCode } from '../../helpers/generate';
import TourCategory from '../../models/tour_category.model';


// [GET] /admin/tours
export const index = async (req: Request, res: Response) => {
    const tours= await Tour.findAll({
    where : {
      deleted:false,
    },
    raw:true
  })//trả về dạng JSON

  tours.forEach(item=>{
    if(item["images"]){
      item["image"]=JSON.parse(item["images"])[0]
    }
    item["price_special"]=item["price"]*(1-item["discount"]/100)
  })

  res.render("admin/pages/tours/index",{
    pageTitle:'Danh sách tour',
    tours:tours
  })
}

// [GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
  //Lấy ra danh sách danh mục
  const categories=await Category.findAll({
    where:{
      deleted:false,
      status:"active"
    },
    raw:true
  })

  res.render("admin/pages/tours/create",{
    pageTitle:"Thêm mới tour",
    categories:categories
  })
}

// [POST] /admin/tours/create
export const createPost = async (req: Request, res: Response) => {
  //tổng số tour có trong database
  const countTour=await Tour.count()
  //tạo ra bản ghi có mã tuor lớn hơn 1 đơn vị
  const code=generateTourCode(countTour+1)

  if(req.body.position===""){
    req.body.position=countTour+1
  }else{
    req.body.position=parseInt(req.body.position)
  }
  const dataTour={
    title:req.body.title,
    code:code,
    images:JSON.stringify(req.body.images),//ban đầu là chuỗi JS
    price:parseInt(req.body.price),
    discount:parseInt(req.body.discount),
    stock:parseInt(req.body.stock),
    timeStart:req.body.timeStart,
    position:req.body.position,
    status:req.body.status
  }
  // console.log(dataTour)
  // console.log(code)


    //vừa create vừa gán
    const tour=await Tour.create(dataTour)
      //update vào bảng tour_category
    const tourId=tour["id"]
  const dataTourCategory={
    tour_id:tourId,
    category_id:parseInt(req.body.category_id),
  } 

  await TourCategory.create(dataTourCategory)

  res.redirect("/admin/tours")
}