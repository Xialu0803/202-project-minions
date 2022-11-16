import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    userId: String,
    role: String, //FIXME: change to enum
    password: String,
});

const UserInfo = mongoose.model('UserInfo', createSchema);

export default UserInfo;