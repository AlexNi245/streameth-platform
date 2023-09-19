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
const video_1 = require("./video");
const session_1 = __importDefault(require("../controller/session"));
const session_2 = __importDefault(require("../model/session"));
const fs_1 = __importDefault(require("fs"));
const eventId = 'zuzalu_montenegro_2023__other';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionController = new session_1.default();
        const sessions = yield sessionController.getAllSessions({
            eventId,
        });
        for (const session of sessions) {
            try {
                const dirPath = yield session_2.default.getSessionImageDirectory(eventId);
                const filePath = yield session_2.default.getSessionImagePath(eventId, session.id);
                if (!fs_1.default.existsSync(dirPath)) {
                    console.log('Dir does not exists, creating it now.');
                    fs_1.default.mkdirSync(dirPath, { recursive: true });
                }
                if (!session.videoUrl) {
                    console.error('No video url found for session ' + session.id);
                    continue;
                }
                yield (0, video_1.extractFirstFrame)(session.videoUrl, filePath);
            }
            catch (error) {
                console.log('error', session.videoUrl, error);
            }
        }
    });
}
main();
