import mongoose from 'mongoose';

// TODO: define not null.
const createSchema = mongoose.Schema({
    flightID: String,
    date: String,
    flightNo: String,
    departure: String,
    destination: String,
    departureTime: Number, // TODO: may redefine type.
    arrivalTime: Number, // TODO: may redefine type.
    airline: String,
    terminal: String,
    gate: String,
    baggageClaim: String,
    carousel: String,
});

const FlightInfo = mongoose.model('FlightInfo', createSchema);

export default FlightInfo;