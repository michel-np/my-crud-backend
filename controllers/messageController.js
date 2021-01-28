const mongoConnector = require("../connectors/mongoDbConnector")
const messagesCollection = "messages";
const { ObjectID } = require("mongodb");

async function getMessages(payload) {
    let messages = await mongoConnector.find(payload);
    return messages;


}

async function addMessage(message) {

    if (message && message.messageTitle && message.messageBody) {
        await mongoConnector.save({
            collection: 'messages',
            document: message
        })
        return true
    }
    else {
        return false
    }

}

const deleteMessage = async (message) => {
    try {
        let messageToBeDeleted = await mongoConnector.findOne({
            collection: messagesCollection,
            query: {
                _id: new ObjectID(message)
            }
        });
        if (messageToBeDeleted) {
            await mongoConnector.deleteOne({
                collection: messagesCollection,
                query: {
                    _id: new ObjectID(message)
                }
            });
            return true
        }
        else {
            return false
        }

    } catch (error) {

    }
    return
}

const updateOne = async (id, newMessage) => {

    await mongoConnector.updateOne({
        collection: messagesCollection,
        query: {
            '_id': new ObjectID(id)
        },
        document: { $set: newMessage }
    })
    return true;

}

module.exports = {
    getMessages,
    addMessage,
    deleteMessage,
    updateOne

};