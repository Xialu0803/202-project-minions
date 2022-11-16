import express from 'express';

import { createFlight, updateFlight, listDepartureFlights, listArrivalFlights, listAllFlights, listFlightsWithNoCarousel } from '../controllers/flights.js';

const router = express.Router();

// router.get('/', getFlights);
router.post('/', createFlight);
router.get('/', listAllFlights)
router.get('/noCarousel', listFlightsWithNoCarousel)
router.patch('/:flightID', updateFlight);
router.get('/departures/:timeDuration', listDepartureFlights);
router.get('/arrivals/:timeDuration', listArrivalFlights);

export default router;
