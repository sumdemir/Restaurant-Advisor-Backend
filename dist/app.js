"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cities_1 = __importDefault(require("./routes/cities"));
const city_1 = __importDefault(require("./models/city"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/local')
    .then(() => {
    app.listen(PORT, () => console.log('Database connected successfully'));
})
    .catch((err) => console.error('connection error', err));
app.get('/api/cities', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield city_1.default.find({});
        if (!cities || cities.length == 0) {
            return res.status(404).json({ message: 'No cities found' });
        }
        return res.status(200).json({ cities });
    }
    catch (error) {
        console.error('Error', error);
        return res.status(500).json({ message: 'An error occurred' });
    }
}));
app.use('/', cities_1.default);
app.use(express_1.default.json());
