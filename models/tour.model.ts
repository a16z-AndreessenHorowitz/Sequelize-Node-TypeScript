import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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
    allowNull:false
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

export default Tour