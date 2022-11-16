import UserInfo from "../models/userInfo.js";

export const getUserInfo = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userInfo = await UserInfo.find({
            userId: userId
        });
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}