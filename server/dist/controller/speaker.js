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
const speaker_1 = __importDefault(require("../model/speaker"));
class SpeakerController {
    constructor() {
        this.controller = new baseController_1.default("fs");
    }
    getSpeaker(speakerId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const speakerQuery = yield speaker_1.default.getSpeakerPath(eventId, speakerId);
            const data = yield this.controller.get(speakerQuery);
            return new speaker_1.default(Object.assign({}, data));
        });
    }
    createSpeaker(speaker) {
        return __awaiter(this, void 0, void 0, function* () {
            const ses = new speaker_1.default(Object.assign({}, speaker));
            const speakerQuery = yield speaker_1.default.getSpeakerPath(ses.eventId, ses.id);
            yield this.controller.create(speakerQuery, ses);
            return ses;
        });
    }
    getAllSpeakersForEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const speakers = [];
            const speakerQuery = yield speaker_1.default.getSpeakerPath(eventId);
            const data = yield this.controller.getAll(speakerQuery);
            for (const ses of data) {
                speakers.push(new speaker_1.default(Object.assign({}, ses)));
            }
            return speakers;
        });
    }
}
exports.default = SpeakerController;
