const router = require("express")();
const Message = require("../models/Message");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken)


router.post('/', async (req, res, next) => {
    let messageCreated = {}
    try {
        const { name, phoneNumber, message, OTP } = req.body;
        const messageData = { name, phoneNumber, message, OTP }
        messageCreated = await Message.create(messageData)
        const sent = await client.messages.create({
            to: `+91${phoneNumber}`,
            from: "+17124124196",
            body: message,
        })

        if (sent.sid) {
            messageCreated.status = "passed";
            messageCreated.sid = sent.sid;
            await messageCreated.save();
        } else {
            messageCreated.status = "failed";
            await messageCreated.save()
            return res.status(401).json({ message: "something went wrong!!!" })
        }
        return res.status(200).json({ message: "success", OTP: OTP })
    }
    catch (error) {
        if (messageCreated._id) {
            messageCreated.status = "failed";
            await messageCreated.save()
        }
        return res.status(401).json(error.message)
    }
})


router.get("/", async( req, res, next ) => {
    try {
        const msg = await Message.find();
        res.status(200).json({msg});
    } catch (err) {
        res.status(401).json(err.message)
    }
})


module.exports = router;