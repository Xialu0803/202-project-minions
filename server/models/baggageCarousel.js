import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    baggageCarouselID: String,
    carouselNo: String,
    lastUseTime: Number, // TODO: may define timestamp
    airline: String,
    flightNo: String,
    terminal: String,
});

const BaggageCarousel = mongoose.model('BaggageCarousel', createSchema);

export default BaggageCarousel;