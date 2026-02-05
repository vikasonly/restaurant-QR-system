import twilio from 'twilio'
import dotenv from 'dotenv' ;
dotenv.config()
console.log(process.env.TWILIO_ACCOUNT_SID)

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
    try {
        const message = await client.messages.create({
            body: "this is the message from the nodejs!",
            from: "whatsapp:+14155238886",
            to: "whatsapp:+917828855579",
          });
        
          console.log(message.body);
    } catch (error) {
        console.log(error)
    }
    
  }
  
  createMessage();
