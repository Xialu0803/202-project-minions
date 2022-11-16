import express from 'express';

import { listAvailbaleGates, createGate, assignRandomGate, updateGate,listGates } from '../controllers/gates.js';

const router = express.Router();

router.get('/', listAvailbaleGates);
router.get('/all', listGates);
router.post('/', createGate);
router.patch('/updateGate', updateGate);
router.patch('/:flightID', assignRandomGate);
// router.patch('/:flightID', updateFlight);
// router.get('/departures/:departure', listDepartureFlights);
// router.get('/arrivals/:destination', listArrivalFlights);

export default router;