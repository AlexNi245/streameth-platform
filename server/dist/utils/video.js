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
exports.extractFirstFrame = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
function extractFirstFrame(hlsUrl, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the file already exists
        if (fs_1.default.existsSync(filePath)) {
            console.log('File already exists, skipping frame extraction.');
            return;
        }
        (0, fluent_ffmpeg_1.default)(hlsUrl)
            .screenshots({
            timemarks: ['00:00:06.000'],
            filename: filePath,
            folder: '.',
            size: '1920x1080',
        })
            .on('end', function () {
            console.log('Screenshots taken');
        })
            .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
            .on('stderr', function (stderrLine) {
            console.log('Stderr: ' + stderrLine);
        });
    });
}
exports.extractFirstFrame = extractFirstFrame;
