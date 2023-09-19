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
const baseImporter_1 = __importDefault(require("../baseImporter"));
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../../utils");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class PretalxImporter extends baseImporter_1.default {
    constructor({ importer, event }) {
        super(event);
        if (importer.type !== 'pretalx')
            throw new Error('Invalid importer type for gsheet module');
        if (!importer.config.url)
            throw new Error('No valid sheetId set for gsheet module');
        this.apiUrl = importer.config.url;
    }
    generateSpeakers() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = yield axios_1.default.get(`${this.apiUrl}/speakers/`);
            let speakers = request.data.results;
            while (request.data.next) {
                request = yield axios_1.default.get(request.data.next);
                speakers = [...speakers, ...request.data.results];
            }
            speakers.forEach((speaker) => __awaiter(this, void 0, void 0, function* () {
                const newSpeaker = {
                    name: speaker.name,
                    bio: speaker.biography,
                    photo: speaker.avatar,
                    twitter: speaker.twitter_handle,
                    github: speaker.github_handle,
                    website: speaker.website,
                    eventId: this.event.id,
                };
                try {
                    if (speaker) {
                        yield this.speakerController.createSpeaker(newSpeaker);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }));
        });
    }
    generateStages() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch https://speak.protocol.berlin/api/events/protocol-berg/stages/
            let request = yield axios_1.default.get(`${this.apiUrl}/rooms/`);
            let stages = request.data.results;
            while (request.data.next) {
                request = yield axios_1.default.get(request.data.next);
                stages = [...stages, ...request.data.results];
            }
            stages.forEach((stage) => __awaiter(this, void 0, void 0, function* () {
                const newStage = {
                    name: stage.name.en,
                    eventId: this.event.id,
                    streamSettings: {
                        streamId: '',
                    },
                    order: stage.position + 1,
                };
                try {
                    if (stage) {
                        yield this.stageController.createStage(newStage);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }));
        });
    }
    generateSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch https://speak.protocol.berlin/api/events/protocol-berg/talks/
            yield Promise.all([this.generateStages(), this.generateSpeakers()]);
            let request = yield axios_1.default.get(`${this.apiUrl}/talks/`);
            let sessions = request.data.results;
            while (request.data.next) {
                request = yield axios_1.default.get(request.data.next);
                sessions = [...sessions, ...request.data.results];
            }
            sessions.forEach((session) => __awaiter(this, void 0, void 0, function* () {
                const speakers = session.speakers.map((speaker) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.speakerController.getSpeaker((0, utils_1.generateId)(speaker.name), this.event.id);
                }));
                const newSession = {
                    name: session.title,
                    description: session.abstract,
                    start: moment_timezone_1.default.tz(new Date(session.slot.start), this.event.timezone).valueOf(),
                    end: moment_timezone_1.default.tz(new Date(session.slot.end), this.event.timezone).valueOf(),
                    eventId: this.event.id,
                    speakers: yield Promise.all(speakers),
                    stageId: (0, utils_1.generateId)(session.slot.room.en),
                };
                try {
                    if (session) {
                        yield this.sessionController.createSession(newSession);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }));
        });
    }
}
exports.default = PretalxImporter;
