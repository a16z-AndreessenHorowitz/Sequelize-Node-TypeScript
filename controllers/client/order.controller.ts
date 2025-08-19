import { Request, Response } from 'express';
import Order from '../../models/order.model';
import { generateOrderCode } from '../../helpers/generate';


// [GET] /tours/:slugCategory
export const order = async (req: Request, res: Response) => {
  const data=req.body

  //Lưu data vào bảng orders
  const dataOrder={
    code:"",
    fullName:data.info.fullName,
    phone:data.info.phone,
    note:data.info.note,
    status:"initial"
  }

  const order=await Order.create(dataOrder);

  //update lại đơn hàng mã code
  const orderId=order.dataValues.id //dataValue   console.log(order) là thấy

  const code=generateOrderCode(orderId)

  await Order.update({
    code:code
  },{
    where:{
      id:orderId 
    }
  })//1 là dữ liệu, 2 là data cần cập nhật

  res.json({
    code:200,
    message:"Đặt hàng thành công!",
    //trả mã đơn hàng code ra giao diện cho front-end để link sang trang gì tiếp theo như kết quả đơn hàng
    orderCode:code
  })
}