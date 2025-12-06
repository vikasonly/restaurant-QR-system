import express from 'express'
import {register} from '../controllers/auth.controller.js'
import {Login} from '../controllers/auth.controller.js'
const router=express.Router();

router.post('/register',register)
router.post('/login',Login)

export default router;