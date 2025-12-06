import mongoose from 'mongoose';

const dbConnect=async()=>{
try{
const connection=mongoose.connect('mongodb+srv://vikaskirdoliya2004_db_user:f4JjyT4QvxrMVjeN@cluster0.09rh6qb.mongodb.net/?appName=Cluster0')
console.log('db connected')
}catch(error){
console.log(error)
}
}

export default dbConnect;