import express from 'express' ;
import { RotationGestureHandler } from 'react-native-gesture-handler';
import verifyToken from '../middlewares/verifyToken';
import checkRole from '../middlewares/checkRole';


const router = express.Router() ;



router.get('/users', verifyToken , checkRole(['admin'], ))