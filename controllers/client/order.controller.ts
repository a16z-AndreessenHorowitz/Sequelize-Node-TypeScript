import { Request, Response } from 'express';


// [GET] /tours/:slugCategory
export const order = async (req: Request, res: Response) => {
  const data=req.body
  console.log(data)
  res.json({
    code:200,
    message:"Đặt hàng thành công!"
  })
}