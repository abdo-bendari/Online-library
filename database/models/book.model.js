import mongoose, { Mongoose } from "mongoose";
import{ Schema, now } from "mongoose";


const bookSchema = new Schema({
title :{
    type : String,
    required : true
},
content :{
    type : String,
    required : true
},
authorId:{
    type : String,
    required : true,
},
publishedDate :{
    type : Date ,
    default : Date.now
}
},{
    timestamps : true
})
const Book = mongoose.model("Book",bookSchema)
export default Book