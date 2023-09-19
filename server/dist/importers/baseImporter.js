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
Object.defineProperty(exports, "__esModule", { value: true });
const speaker_1 = require("../controller/speaker");
const event_1 = require("../controller/event");
const session_1 = require("../controller/session");
const stage_1 = require("../controller/stage");
class BaseImporter {
    constructor(event) {
        this.speakerController = new speaker_1.SpeakerController();
        this.eventController = new event_1.EventController();
        this.sessionController = new session_1.SessionController();
        this.stageController = new stage_1.StageController();
        this.event = event;
    }
    generateSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    generateStages() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    generateSpeakers() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.default = BaseImporter;
