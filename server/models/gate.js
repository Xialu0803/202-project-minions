import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    gate: String,
    terminal: String,
    flightNo: String,
    status: String,
    lastUseTime: Number, //TODO: redefine type to timestamp.
});

const Gate = mongoose.model('Gate', createSchema);

export default Gate;