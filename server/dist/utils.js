"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiUrl = exports.IMAGE_BASE_PATH = exports.PUBLIC_PATH = exports.BASE_PATH = exports.generateId = void 0;
const path_1 = __importDefault(require("path"));
const generateId = (key) => {
    // all lowercase, no spaces, no special characters
    return key
        .trim()
        .replace(/\s/g, "_")
        .replace(/[^\w\s]/g, "")
        .toLowerCase();
};
exports.generateId = generateId;
exports.BASE_PATH = "../data";
exports.PUBLIC_PATH = "../public";
exports.IMAGE_BASE_PATH = path_1.default.join(process.cwd(), "public");
const apiUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000/api";
    }
    return "https://app.streameth.org/api";
};
exports.apiUrl = apiUrl;
