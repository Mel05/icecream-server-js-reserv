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
exports.getIcecreamById = exports.getIcecreams = void 0;
const chalk_1 = __importDefault(require("chalk"));
const Icecream_1 = __importDefault(require("../models/Icecream"));
const getIcecreams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 0, category = undefined, sortBy = 'rating', order = 1, search = '', } = req.query;
        let categoryItem = category;
        let searchItem = search;
        let sortByItem = { rating: order };
        if (category === undefined) {
            categoryItem = { $in: [0, 1, 2, 3, 4, 5] };
        }
        if (sortBy === 'rating') {
            sortByItem = { rating: order };
        }
        else if (sortBy === 'price') {
            sortByItem = { price: order };
        }
        else if (sortBy === 'title') {
            sortByItem = { title: order };
        }
        const startElementIndex = (Number(page) - 1) * Number(limit);
        const data = yield Icecream_1.default.find({
            category: categoryItem,
            title: { $regex: new RegExp(searchItem, 'i') },
        })
            .sort(sortByItem)
            .limit(Number(limit))
            .skip(startElementIndex);
        const lengthData = yield Icecream_1.default.find({
            category: categoryItem,
            title: { $regex: new RegExp(searchItem, 'i') },
        })
            .sort(sortByItem)
            .count();
        const totalPage = Math.ceil(Number(lengthData) / Number(limit));
        const [...dbData] = data;
        res.json({
            dbData,
            paginationData: {
                lengthData,
                totalPage,
            },
        });
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
    }
});
exports.getIcecreams = getIcecreams;
const getIcecreamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const icecreamData = yield Icecream_1.default.findById(req.params.id);
        res.json(icecreamData);
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
    }
});
exports.getIcecreamById = getIcecreamById;
