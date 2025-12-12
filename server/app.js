import express from 'express';
import dbConnect from './config/database.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors'
import TableRoutes from './routes/table.route.js'
import verifyToken from './middlewares/verifyToken.js';
import checkRole from './middlewares/checkRole.js';
import sessionRoutes from './routes/session.route.js'
import menuRoutes from './routes/menu.route.js'
import dotenv from 'dotenv' ;
import cartRoutes from './routes/cart.route.js'
dotenv.config() ;
const app = express();
app.use(cors({
  origin : ['http://localhost:5173','http://localhost:5174'],
  
}))

dbConnect();
app.use(express.json())
app.get('/', (req, res) => {
  res.send('THIS IS MY HOMEPAGE');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1' ,TableRoutes ) ;
app.use('/api/v1' , sessionRoutes);
app.use('/api/v1' , menuRoutes);
app.use('/api/v1' , cartRoutes)


  app.use((err,req,res,next)=>{
    if(err){
      
      res.status(err.status || 500).json({
        messsage : err?.message || 'server error'
      })
    }
  })


  
app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});
 
