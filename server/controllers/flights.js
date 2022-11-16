import FlightInfo from "../models/flightInfo.js";

// export const getFlights = async (req, res) => {
//     try {
//         const flight = await FlightInfo.find();
//         res.status(200).json(flight);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const createFlight = async (req, res) => {
    const flight = req.body;
    const flightNo = flight.flightNo;
    const departure = flight.departure;
    const destination = flight.destination;
    const departureTime = flight.departureTime;
    const arrivalTime = flight.arrivalTime;
    const airline = flight.airline;
    const flightID = flightNo + "#" + departureTime.slice(0, 10)
    const date = departureTime.slice(0, 10)
    const departueTimeEpoch = Date.parse(departureTime)
    const arrivalTimeEpoch = Date.parse(arrivalTime)
    //console.log(departueTimeEpoch)
    const newFlight = new FlightInfo(
        {
            "flightID": flightID,
            "date": date,
            "flightNo": flightNo,
            "departure": departure,
            "destination": destination,
            "departureTime": departueTimeEpoch,
            "arrivalTime": arrivalTimeEpoch,
            "airline": airline,
            "terminal": "Not Assigned",
            "gate": "Not Assigned",
            "carousel": "Not Assigned"
        }
    );
    try {
        await newFlight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(409).json({ message: error.message }); // TODO: add error message.
    }
}

export const listAllFlights = async (req, res) => {
    try {
        const allFlights = await FlightInfo.find();
        res.status(200).json(allFlights);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const listFlightsWithNoCarousel = async (req, res) => {
    try {
        const Flights = await FlightInfo.find({ "carousel": "Not Assigned" });
        //console.log(Flights)
        res.status(200).json(Flights);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateFlight = async (req, res) => {
    const updatedInfo = req.body;
    const departureTime = updatedInfo.departureTime;
    const arrivalTime = updatedInfo.arrivalTime;
    const id = updatedInfo.flightID;
    const departueTimeEpoch = Date.parse(departureTime)
    const arrivalTimeEpoch = Date.parse(arrivalTime)
    const newFlight = (
        {
            "departureTime": departueTimeEpoch,
            "arrivalTime": arrivalTimeEpoch,
        }
    );

    //console.log(updatedInfo)

    try {
        const { airline } = await FlightInfo.findOne({ "flightID": id }).select({ "airline": 1, "_id": 0 })
        console.log({ airline })
        await FlightInfo.findOneAndUpdate({ "flightID": id }, newFlight)
        res.send({ success: "Updating successfully" });
    } catch {
        res.status(500).send({ error: "Problem with Updating the Flight record" })
    }
}

export const listDepartureFlights = async (req, res) => {
    const departure = 'SFO';
    const currTime = Date.now();
    const timeDuration = Number(req.params.timeDuration);
    try {
        const departureFlights = await FlightInfo.find({
            departureTime: { $gte: currTime, $lte: currTime + timeDuration },
            departure: departure
        });
        res.status(200).json(departureFlights);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const listArrivalFlights = async (req, res) => {
    const destination = 'SFO';
    const currTime = Date.now();
    const timeDuration = Number(req.params.timeDuration);
    try {
        const arrivalFlights = await FlightInfo.find({
            arrivalTime: { $gte: currTime, $lte: currTime + timeDuration },
            destination: destination
        });
        res.status(200).json(arrivalFlights);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
