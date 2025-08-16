import {Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config()
const sequelize = new Sequelize(
  process.env.DATABASE_NAME, //Tên database
 process.env.DATABASE_USERNAME, //user name để đăng nhập
 process.env.PASSWORD,//password
  {
    host: process.env.DATABASE_HOST,//link của hosting
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
   console.log('Connect successfully.');
}).catch((error) => {
   console.error('Connect error');
});

export default sequelize;