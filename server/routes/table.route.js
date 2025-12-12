import express from 'express' ;
import { createTable, getAllTables, getTableBySlug } from '../controllers/table.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';

const router = express.Router() ;

router.post('/tables',createTable )
router.get('/tables/:slug' , getTableBySlug)
 
router.get('/tables' , verifyToken , checkRole(['admin']), getAllTables)
export default router