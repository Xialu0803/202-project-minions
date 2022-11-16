import BaggageCarousel from "../models/baggageCarousel.js";
import FlightInfo from "../models/flightInfo.js";

export const listBaggageCarousel = async (req, res) => {
    const terminal = req.headers.terminal;
    try {
        const baggageCarousel = await BaggageCarousel.find({ terminal: terminal});
        res.status(200).json(baggageCarousel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBaggageCarousel = async (req, res) => {
    const baggageCarousel = req.body;
    const newBaggageCarousel = new BaggageCarousel(baggageCarousel);
    try {
        await newBaggageCarousel.save();
        res.status(201).json(newBaggageCarousel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const listBaggageCarouselByFlight = async (req, res) => {
    const currTime = Date.now();
    const id = req.headers.flight_id;
    try {
        const { terminal } = await FlightInfo.findOne({ "flightID": id }).select({ "terminal": 1, "_id": 0 })
        const availableBaggageCarousel = await BaggageCarousel.find({ lastUseTime: { $lt: currTime - 3600000 }, terminal: terminal });
        res.status(200).json(availableBaggageCarousel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const assignBaggageCarousel = async (req, res) => {
    const currTime = Date.now();
    const carousel = req.body.carousel;
    const id = req.body.flightID;
    try {
        const { airline } = await FlightInfo.findOne({ "flightID": id }).select({ "airline": 1, "_id": 0 })
        const { flightNo } = await FlightInfo.findOne({ "flightID": id }).select({ "flightNo": 1, "_id": 0 })
        await FlightInfo.findOneAndUpdate({ "flightID": id }, { "carousel": carousel })
        await BaggageCarousel.findOneAndUpdate({ "baggageCarouselID": carousel }, { "flightNo": flightNo, "lastUseTime": currTime, "airline": airline })
        res.send({ success: "Assign Carousel successfully" });
    } catch {
        res.status(500).send({ error: "Problem with assigning Carousel" })
    }
}