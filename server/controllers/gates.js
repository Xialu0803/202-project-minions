import Gate from "../models/gate.js";
import FlightInfo from "../models/flightInfo.js";

export const listAvailbaleGates = async (req, res) => {
    const currTime = Date.now();
    // console.log(currTime)
    try {
        const availableGates = await Gate.find({ lastUseTime: { $lt: currTime - 3600000 }, status: "Available" });
        res.status(200).json(availableGates);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const listGates = async (req, res) => {
    try {
        const allGates = await Gate.find();
        res.status(200).json(allGates);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createGate = async (req, res) => {
    const gate = req.body;
    const newGate = new Gate(gate);
    try {
        await newGate.save();
        res.status(201).json(newGate);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateGate = async (req, res) => {
    const updatedInfo = req.body;
    const gateId = updatedInfo.gate;
    const status = updatedInfo.status;
    try {
        await Gate.findOneAndUpdate({ "gate": gateId }, { "status": status })
        res.send({ success: "Updating successfully" });
    } catch {
        res.status(500).send({ error: "Problem with Updating the GateInfo record" })
    }
}

export const assignRandomGate = async (req, res) => {
    const currTime = Date.now();
    const updatedInfo = req.body;
    const id = updatedInfo.flightID;
    const assignedGate = updatedInfo.gate
    try {
        const { flightNo } = await FlightInfo.findOneAndUpdate({ "flightID": id }, { "gate": assignedGate })
        const { terminal } = await Gate.findOne({ "gate": assignedGate }).select({ "terminal": 1, "_id": 0 })
        await FlightInfo.findOneAndUpdate({ "flightID": id }, {"terminal":terminal})
        await Gate.findOneAndUpdate({ "gate": assignedGate }, { "lastUseTime": currTime, flightNo })
        res.send({ success: "Assign Gate successfully" });
    } catch {
        res.status(500).send({ error: "Problem with assigning gate." })
    }
}