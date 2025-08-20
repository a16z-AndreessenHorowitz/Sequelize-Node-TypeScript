import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import slugify from "slugify"

const Tour = sequelize.define("Tour", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, //Tự động tăng
    allowNull: false, //ko cho phép trống
    primaryKey: true// khoá chính
  },
  title: {
    type: DataTypes.STRING, //mặc định 255
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(10),
  },
  images: {
    type: DataTypes.TEXT('long'),
  },
  price: {
    type: DataTypes.INTEGER,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  information: {
    type: DataTypes.TEXT('long'),
  },
  schedule: {
    type: DataTypes.TEXT('long'),
  },
  timeStart: {
    type: DataTypes.DATE,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(20),
  },
  position:{
    type:DataTypes.INTEGER,
  },
  slug:{
    type:DataTypes.STRING(255),
    allowNull:true,//cho phép null để phía dưới fix lại
  },
  deleted:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  deletedAt:{
    type:DataTypes.DATE
  }

}, {
  tableName:"tours",
  timestamps:true //Tự động quản lý createAt,updateAt
})
//1 tên model
//2 danh sách các biến kèm kiểu dữ liệu
//3 kết nối đến tables


// vì Sequelize không có cách nào biết giá trị của title trước khi bạn insert.
// Lúc bạn định nghĩa model thì title vẫn chưa có dữ liệu, mà slug lại phụ thuộc vào title.
// Ví dụ:
//   title: "Tour Hà Nội"
//   slug: ??? // chưa có title thì không slugify được
//   Hook beforeCreate chạy trước khi Sequelize gửi INSERT xuống database, lúc đó object tour đã có đầy đủ dữ liệu bạn truyền vào (title, code, v.v).
Tour.beforeCreate((tour)=>{
  tour["slug"]=slugify(`${tour["title"]}-${Date.now()}`,{
    lower:true,
    strict:true,
  })
})  

export default Tour