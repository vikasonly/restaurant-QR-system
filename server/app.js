import express from 'express';
import dbConnect from './config/database.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import TableRoutes from './routes/table.route.js';
import verifyToken from './middlewares/verifyToken.js';
import checkRole from './middlewares/checkRole.js';
import sessionRoutes from './routes/session.route.js';
import menuRoutes from './routes/menu.route.js';
import dotenv from 'dotenv';
import coupanRoutes from './routes/coupan.route.js';
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.routes.js'
import {Server} from 'socket.io'
dotenv.config();
import {createServer} from 'http' ;

const app = express();
const server = createServer(app)
const io = new Server(server , {
  cors : {
    origin : '*'
  }
})
console.log(io)

app.set('io' , io)

io.on('connection', (socket) => {
  console.log('user connected');
});



app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
  })
);
//NOTE fn used for mongodb connection
dbConnect();
app.use(express.json());
app.get('/', (req, res) => {
  io.emit('order' , {orderid : 1 , amount : 3000})
  res.send('THIS IS MY HOMEPAGE');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', TableRoutes);
app.use('/api/v1', sessionRoutes);
app.use('/api/v1', menuRoutes);
app.use('/api/v1', cartRoutes);
app.use('/api/v1', coupanRoutes);
app.use('/api/v1', orderRoutes)
// app.get('/qr' ,(req,res)=>{
//   res.download()
// })
//here we placed the global error handleer =>
app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    //TODO here you have to create a log file and call the logger.error method to save the information regarding every error you get in this project
    res.status(err.status || 500).json({
      
      messsage: err?.message || 'server error',
    });
  }
});

server.listen(3000, () => {
  console.log(`Server is running on 3000`);
});

//git init
//git status
//git add
//git commit
//git push

//branches ? local repo ? remote repo ?

//GIT AND GITHUB

//GIT => VERSION CONTROL SYSTEM

//resume.pdf => //edit => resume_1.pdf

//resume.pdf => resume_1.pdf

//GIT => local machine => specific folder => project 4.0

// =>GIT COMMIT => VERSIOn

//setup + tailwind version_1
//user + table version _ 2

// user + table version => refresh token






//CORS => cross origin resoucre sharing ;

//client => server 
// url => url 
// protocal , domainName/ip , port 
// http://localhost:5173 //client
// http://localhost:3000 // server  first port 


// http://127.0.0.1:3000 //client
// https://localhost:3000 // server  first port

//port alag cors , domain/ip => cors => protocal cors  ;

// /orders => execute => re //cors
// res.header('allow-')