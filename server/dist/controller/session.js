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
const baseController_1 = __importDefault(require("./baseController"));
const session_1 = __importDefault(require("../model/session"));
class SessionController {
    constructor() {
        this.controller = new baseController_1.default('fs');
    }
    getSession(sessionId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionQuery = yield session_1.default.getSessionPath(eventId, sessionId);
            const data = yield this.controller.get(sessionQuery);
            return new session_1.default(Object.assign({}, data));
        });
    }
    createSession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const ses = new session_1.default(Object.assign({}, session));
            const sessionQuery = yield session_1.default.getSessionPath(ses.eventId, ses.id);
            yield this.controller.create(sessionQuery, ses);
            return ses;
        });
    }
    getAllSessions({ eventId, stage, timestamp, date, speakerIds, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = [];
            const sessionQuery = yield session_1.default.getSessionPath(eventId);
            let data = yield this.controller.getAll(sessionQuery);
            if (stage) {
                data = data.filter((session) => session.stageId === stage);
            }
            if (timestamp) {
                data = data.filter((session) => new Date(session.end).getTime() >= timestamp);
            }
            if (date) {
                const filterDate = new Date(date);
                data = data.filter((session) => {
                    const sessionDate = new Date(session.start);
                    return (sessionDate.getFullYear() === filterDate.getFullYear() &&
                        sessionDate.getMonth() === filterDate.getMonth() &&
                        sessionDate.getDate() === filterDate.getDate());
                });
            }
            if (speakerIds) {
                data = data.filter((session) => {
                    return session.speakers.some((speaker) => speakerIds.includes(speaker.id));
                });
            }
            // sort by start date
            data.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
            for (const ses of data) {
                sessions.push(new session_1.default(Object.assign({}, ses)));
            }
            return sessions;
        });
    }
}
exports.default = SessionController;
