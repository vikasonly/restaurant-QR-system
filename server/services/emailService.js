import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "riteshpatidar088@gmail.com",
    pass: 'gaee jvfa mele ukmu',
  },
});

export default transporter ;