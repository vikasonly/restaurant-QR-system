import mongoose from 'mongoose' ;

const menuSchema = new mongoose.Schema({
 name : {
    type : String 
 },  
 description : {
   type : String
 },
 image : {
    type : String
 }, 
 isAvailable : {
   type : String  ,
   default : true
 },  
 price : {
    type : Number
 }, 
 category : {
    type : String
 } 
})


const Menu = mongoose.model('Menu' , menuSchema) ;

export default Menu