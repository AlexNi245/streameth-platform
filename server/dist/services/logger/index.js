"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class LoggerService {
    constructor() {
        this.logFilePath = path_1.default.join(__dirname, "error.log");
    }
    logError(message) {
        const date = new Date();
        const formattedMessage = `${date.toISOString()} - ERROR: ${message}\n`;
        fs_1.default.appendFile(this.logFilePath, formattedMessage, (err) => {
            if (err) {
                console.error(`Failed to write to log file: ${err.message}`);
            }
        });
    }
}
exports.default = LoggerService;
