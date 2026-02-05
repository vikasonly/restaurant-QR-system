import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import transporter from '../services/emailService.js';
import registerTemplate from '../services/emailTemplates/registerTemplate.js';
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

    //integrate mail service here
    const info = await transporter.sendMail({
      from: 'vikaskirdoliya2004@gmail.com',
      to: newUser.email,
      subject: 'User registration',
      text: registerTemplate(newUser.name, 'Tastebox'), // plain‑text body
    });
    console.log('mail sent', info.messageId);
    res.status(201).json({
      messsage: 'your account has been successfully created',
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

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: 'Password donot match, Please try again' });
    }
    //  console.log(isPasswordMatch)
    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    });
    const refreshToken = generateRefreshToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
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

// gaee jvfa mele ukmu

export const searchAccount = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send('No account found');
    }
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res) => {
  try {
    //refreshToken in the req.body
    const { refreshToken } = req.body;
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        '5ee5ccd49bc212e3ce9f4b67b63ab981433cccfbe60f7dbf92b22b87116d3ea73ccf4fb6afbf0e73f90772f7a838156006d5d1faec38da9314a20484a639cd6c'
      );
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Refresh token expired',
        });
      }
    }
    console.log(decoded);
    //step2 => find refresh token in the current user document
    const user = await User.findOne({ _id: decoded.id });
    if (!user.refreshToken) {
      return res.json({
        success: false,
        message: 'No refresh token found in db',
      });
    }
    if (user.refreshTokenExpiresTime < new Date()) {
      return res.send('Refresh token expired');
    }

    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
    });
    res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.json({
      message: error.name,
    });
  }
};