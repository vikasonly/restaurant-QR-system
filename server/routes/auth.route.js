import express from 'express' ;
import { Login, refresh, register, searchAccount } from '../controllers/auth.controller.js';
import SessionTokenVerfiy from '../middlewares/SessionTokenVerfiy.js';
import verifyToken from '../middlewares/verifyToken.js';
const router = express.Router() ;

router.post('/register',register )
router.post('/login',Login )
router.post('/search-account', searchAccount)


router.post('/convert' , SessionTokenVerfiy , (req,res)=>{
    console.log(req.session)
    
})

router.post('/refresh' ,   refresh)


export default router

