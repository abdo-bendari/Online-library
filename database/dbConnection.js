import { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
 const dbConn = connect(process.env.DB).then(()=>{
    console.log("database connected successfully");
}).catch(()=>{
    console.log("database connected failed");
})

export default dbConn