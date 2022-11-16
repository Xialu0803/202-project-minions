import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import flightRoutes from './routes/flights.js';
import baggageRoutes from './routes/baggages.js';
import gateRoutes from './routes/gates.js';
import userRoutes from './routes/users.js';


const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/flights', flightRoutes);
app.use('/baggages', baggageRoutes);
app.use('/gates', gateRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = 'mongodb+srv://mern:javascript@cluster0.mrm6pyx.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;




   mongoose.connect(process.env.MONGODB_URI||CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


