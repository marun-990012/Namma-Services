
import User from '../models/user-model.js';

export default function createAdmin() {
    return async (req, res, next) => {
        const totalUser = await User.countDocuments();
        if (!(req.body.userType=='admin' && totalUser>0)) {
            next();
        } else {
            return res.status(400).json({ error: "Admin already exists" });
        }
    }
}
