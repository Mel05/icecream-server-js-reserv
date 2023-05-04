"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const app_1 = require("./app");
const app_2 = require("./app");
app_1.app.listen(app_2.PORT, () => {
    console.log(chalk_1.default.yellow(''));
    console.log(chalk_1.default.yellow('-----------'));
    console.log(chalk_1.default.yellow(`piu piu Server start OK on port ${app_2.PORT}  `));
    console.log(chalk_1.default.yellow('OGC'));
});
