import { Users } from "../model/User.js"
export const addUser = async (req, res) => {
    const ifUserExist = await Users.findOne({ sub: req.body.sub });
    if (ifUserExist) {
        return res.status(409).json({ message: "User Already Exists" })

    }
    else {

        const newUser = new Users(req.body)
        try {
            const response = await newUser.save();
            res.status(201).json(response);
        } catch (error) {
            res.sendStatus(500).json({ message: "Internal Server Error" })

        }
    }
}

export const getUsers = async (req, res) => {
    try {
        const response = await Users.find({});
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}