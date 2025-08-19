import { Request, Response } from 'express';
import Order from '../../models/order.model';
import { generateOrderCode } from '../../helpers/generate';
import Tour from '../../models/tour.model';
import OrderItem from '../../models/order-item.model';


// [GET] /tours/:slugCategory
export const order = async (req: Request, res: Response) => {
  const data=req.body

  //B1:Lưu data vào bảng orders
    const dataOrder={
      code:"",
      fullName:data.info.fullName,
      phone:data.info.phone,
      note:data.info.note,
      status:"initial"
    }

    const order=await Order.create(dataOrder);



  //B2:update lại đơn hàng mã code
    const orderId=order.dataValues.id //dataValue   console.log(order) là thấy

    const code=generateOrderCode(orderId)

    await Order.update({
      code:code
    },{
      where:{
        id:orderId 
      }
    })//1 là dữ liệu, 2 là data cần cập nhật




  //B3:lưu data vào bảng orders_item
    for(const item of data.cart){
      const dataItem={
        orderId:orderId,
        tourId:item.tourId,
        quantity:item.quantity,
      }
      //thiếu ba cột price, discount, timeStart
      //lấy ra info của tour
      const infoTour=await Tour.findOne({
        where:{
          id:item.tourId,
          deleted:false,
          status:"active"
        },
        raw:true
      })
      
      dataItem["price"]=infoTour["price"]
      dataItem["discount"]=infoTour["discount"]
      dataItem["timeStart"]=infoTour["timeStart"]

      // console.log(dataItem)
      await OrderItem.create(dataItem)
      
    }
    
  res.json({
    code:200,
    message:"Đặt hàng thành công!",
    //trả mã đơn hàng code ra giao diện cho front-end để link sang trang gì tiếp theo như kết quả đơn hàng
    orderCode:code
  })
}