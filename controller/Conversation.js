import { Conversation } from "../model/Conversation.js";

export const createConversation = async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const text = req.body.text;
    try {
        const conversationExists = await Conversation.findOne({
            $or: [
                {
                    'members.senderId': senderId,
                    'members.receiverId': receiverId
                },
                {
                    'members.senderId': receiverId,
                    'members.receiverId': senderId
                }

            ]
        });

        if (conversationExists) {
            return res.status(200).json({ message: 'Conversation already exists', conversationId: conversationExists._id });
        } else {
            const newConversation = new Conversation({
                members: { senderId, receiverId },
                message: {
                    senderId: senderId,
                    receiverId: receiverId,
                    text: text
                }
            });

            await newConversation.save();

            return res.status(201).json({ message: 'New Conversation Created!', conversationId: newConversation._id });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getConversation = async (req, res) => {

    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const conversation = await Conversation.findOne({
            $or: [
                {
                    'members.senderId': senderId,
                    'members.receiverId': receiverId
                },
                {
                    'members.senderId': receiverId,
                    'members.receiverId': senderId
                }

            ]
        });

        if (conversation) {
            return res.status(200).json(conversation);
        }
        else {
            return res.status(500).json()
        }

    } catch (error) {
        return res.status(500).json()

    }
}
export const allConversation = async (req, res) => {

    try {

        const conversations = await Conversation.find({});

        if (conversations.length > 0) {

            return res.status(200).json(conversations);
        }
        else {
            throw new Error('No conversations');
        }


    } catch (error) {
        return res.status(500).json()

    }
}

