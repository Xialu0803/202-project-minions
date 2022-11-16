import express from 'express';

import { listBaggageCarousel, createBaggageCarousel, assignBaggageCarousel,listBaggageCarouselByFlight } from '../controllers/baggages.js';

const router = express.Router();

router.get('/', listBaggageCarousel);
router.get('/byFlight', listBaggageCarouselByFlight);
router.post('/', createBaggageCarousel);
router.patch('/:flightID', assignBaggageCarousel);

export default router;
