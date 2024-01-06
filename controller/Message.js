import { Conversation } from "../model/Conversation.js";

export const addMessage = async (req, res) => {
    try {
        const message = req.body.message;
        const conversationId = req.body.conversationId;

        const updatedMessage = await Conversation.findByIdAndUpdate(
            { _id: conversationId },
            { $push: { messages: message } },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(500).json({ error: 'Failed to update conversation' });
        }

        return res.status(200).json(updatedMessage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getMessage = async (req, res) => {
    const conversationId = req.params.id;
    try {
        const conversation = await Conversation.findOne({ _id: conversationId });

        if (!conversation) {
            return res.status(500).json({ error: 'Failed to retrieve conversation' });
        }

        return res.status(200).json(conversation.messages || []);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
