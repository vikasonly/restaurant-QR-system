import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //check if user is registered
    const userData = await User.findOne({ email });
    //  data mila =>   {name : "ritesh" , 'email':'ritesh@gmail.com'} // data nhi mila => null
    if (userData) {
      res.status(400).json({
        message: 'you are already registered , Please login',
      });
    }

    //if user is not registered , hash the password
    const passwordHash = await bcrypt.hash(password, 12);
    const data = { name, email, phone, passwordHash };
    const newUser = await User.create(data);
    res.status(201).json({
      messsage: 'success',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//form register => email + password + name + phone

export const Login = async (req, res) => {
  try {
    //steps
    //email or password
    const { email, password } = req.body;
    //step1 email se mujhe ko check karna hain => user account hain ya nhi
    const user = await User.findOne({ email });
    console.log(user);
    //  if user exist
    //  {
    //     _id: new ObjectId('692801bcd144d881c61e0ff3'),
    //     name: 'ritesh',
    //     email: 'ritesh@gmail.com',
    //     phone: 4324324,
    //     passwordHash: '$2b$12$ikfk1e5NbuzbEp0AI1xYHeht6Rv/JmYonszru.JlK5Ve//RGEN1Ge',
    //     accountTypes: 'REGISTERED',
    //     role: 'customer',
    //     lastlogin: 2025-11-27T07:46:01.267Z,
    //     __v: 0
    //   }
    if (!user) {
      res.status(400).json({
        message: `There is no account with ${email} , Please create an account and try again`,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if(!isPasswordMatch){
      return res.status(400).json({message : 'Password donot match, Please try again'})
    }
    //  console.log(isPasswordMatch)
    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id : user._id
      
    });
    const refreshToken = generateRefreshToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id : user._id
    });

    user.refreshToken = refreshToken;
    user.refreshTokenExpiresTime = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );
    user.lastlogin = new Date();
    await user.save();

    res.status(200).json({
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};