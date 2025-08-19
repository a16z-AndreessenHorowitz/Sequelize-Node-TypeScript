import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, //Tự động tăng
    allowNull: false, //ko cho phép trống
    primaryKey: true// khoá chính
  },
  orderId:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  timeStart: {
    type: DataTypes.DATE,
    allowNull:false,
  },
}, {
  tableName:"orders_item",
  timestamps:false //Tự động quản lý createAt,updateAt
})
//1 tên model
//2 danh sách các biến kèm kiểu dữ liệu
//3 kết nối đến tables

export default OrderItem