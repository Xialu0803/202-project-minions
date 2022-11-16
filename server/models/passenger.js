import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    passengerId: String,
    name: String,
    flightNo: String,
    checkedBaggages: Number,
});

const Passenger = mongoose.model('Passenger', createSchema);

export default Passenger;