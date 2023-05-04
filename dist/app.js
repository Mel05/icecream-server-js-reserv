"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonBodyMiddleware = exports.upload = exports.app = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const multer_1 = __importDefault(require("multer"));
const rootRouter_1 = require("./routes/rootRouter");
dotenv_1.default.config();
exports.PORT = process.env.PORT;
const DB_PATH = process.env.DB_PATH;
mongoose_1.default
    .connect('mongodb://' + DB_PATH)
    .then(() => console.log(chalk_1.default.yellow('BD works unlike me')))
    .then(() => console.log(chalk_1.default.yellow('OGC')))
    .catch(err => console.log(chalk_1.default.red('BD error', err)));
exports.app = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'src/img');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({ storage });
exports.jsonBodyMiddleware = express_1.default.json();
exports.app.use(exports.jsonBodyMiddleware);
exports.app.use((0, cors_1.default)());
exports.app.use('/', (0, rootRouter_1.getRootRouter)());
