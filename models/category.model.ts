import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define("Categories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, //Tự động tăng
    allowNull: false, //ko cho phép trống
    primaryKey: true// khoá chính
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(500),
  },
  description: {
    type: DataTypes.TEXT("long"),
  },
  status: {
    type: DataTypes.STRING(20),
  },
  position: {
    type: DataTypes.INTEGER,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}, {
  tableName:"categories",
  timestamps:true //Tự động quản lý createAt,updateAt
})
//1 tên model
//2 danh sách các biến kèm kiểu dữ liệu
//3 kết nối đến tables

export default Category