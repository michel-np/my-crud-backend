const router = require("express").Router();
const messageController = require("../controllers/messageController")


router.get("/default", async (req, res, next) => {
    res.status(200).send('Okay');
})


router.post('/get-messages', async (req, res, next) => {
    try {

        var messages = await messageController.getMessages({ ...req.body, collection: "messages" })
        if (messages) {
            res.status(200)
            res.send(messages)
        }
        else {
            return { "message": "no messages available" }
        }
    }
    catch (err) {
        next(err)
    }
})

router.post("/add-message", async (req, res, next) => {
    try {
        let messageSent = await messageController.addMessage(req.body);
        if (messageSent) {
            res.status(200).send('Message successfully saved!')
        }
        else {
            res.status(200).send("Unable to save the message.")
        }
    } catch (err) {

    }
})

router.post("/delete-message/:id", async (req, res, next) => {
    try {
        await messageController.deleteMessage(req.params.id);
        res.status(200);
    } catch (error) {

    }
})

router.post("/update-message/:id", async (req, res, next) => {
    try {
        await messageController.updateOne(req.params.id, req.body.newMessage);
        res.status(200).send("Message Updated");
    } catch (error) {

    }
})

module.exports = router;