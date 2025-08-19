import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, //Tự động tăng
    allowNull: false, //ko cho phép trống
    primaryKey: true// khoá chính
  },
  code:{
    type: DataTypes.STRING(50),
    allowNull:false
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING(500),
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deletedAt: {
    type: DataTypes.DATE
  },
  status:{
    type: DataTypes.STRING(20),
  },

}, {
  tableName:"orders",
  timestamps:true //Tự động quản lý createAt,updateAt
})
//1 tên model
//2 danh sách các biến kèm kiểu dữ liệu
//3 kết nối đến tables

export default Order