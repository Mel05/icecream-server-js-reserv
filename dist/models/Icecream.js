"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const IcecreamSchema = new mongoose_1.default.Schema({
    id: { type: String },
    title: { type: String },
    price: Number,
    imageUrl: { type: String },
    sizes: [Number],
    types: [Number],
    rating: Number,
    category: Number,
    count: Number,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Icecream', IcecreamSchema);
