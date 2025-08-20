import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const TourCategory = sequelize.define("TourCategory", {
  tour_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    references:{
      model:'tours',
      key:'id',
    }
  },
  category_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    references:{
      model:'categories',
      key:'id',
    }
  }
}, {
  tableName:"tours_categories",
  timestamps:false //Tự động quản lý createAt,updateAt
})
//1 tên model
//2 danh sách các biến kèm kiểu dữ liệu
//3 kết nối đến tables

export default TourCategory