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
const googleapis_1 = require("googleapis");
const utils_1 = require("../../utils");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const SPEAKER_SHEET = 'Speakers';
const SPEAKER_DATA_RANGE = 'A2:D';
const STAGE_SHEET = 'Stages';
const STAGE_DATA_RANGE = 'A3:D';
const SESSION_SHEET = 'Sessions';
const SESSION_DATA_RANGE = 'A3:L';
class Importer extends baseImporter_1.default {
    constructor({ importer, event }) {
        super(event);
        if (importer.type !== 'gsheet')
            throw new Error('Invalid importer type for gsheet module');
        if (!importer.config.sheetId)
            throw new Error('Sheet ID is missing for gsheet module');
        if (!process.env.GOOGLE_API_KEY)
            throw new Error("Environment variable 'GOOGLE_API_KEY' is missing");
        this.sheetId = importer.config.sheetId;
        this.apiKey = process.env.GOOGLE_API_KEY;
        this.connection = this.connectToGoogleSheets();
    }
    connectToGoogleSheets() {
        return googleapis_1.google.sheets({
            version: 'v4',
            auth: this.apiKey,
        });
    }
    getDataForRange(sheetName, range) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.connection.spreadsheets.values.get({
                spreadsheetId: this.sheetId,
                range: `${sheetName}!${range}`,
            });
            return response.data.values || [];
        });
    }
    generateSpeakers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getDataForRange(SPEAKER_SHEET, SPEAKER_DATA_RANGE);
            for (const row of data) {
                const [name, description, twitterHandle, avatar] = row;
                const speaker = {
                    name,
                    bio: description || 'No description',
                    photo: avatar || undefined,
                    twitter: twitterHandle,
                    eventId: this.event.id,
                };
                try {
                    yield this.speakerController.createSpeaker(speaker);
                }
                catch (e) {
                    console.error(`Error creating speaker:`, speaker, e);
                }
            }
        });
    }
    generateStages() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getDataForRange(STAGE_SHEET, STAGE_DATA_RANGE);
            for (const row of data) {
                const [name, streamId, image] = row;
                const stage = {
                    name,
                    eventId: this.event.id,
                    streamSettings: {
                        streamId,
                    },
                };
                try {
                    yield this.stageController.createStage(stage);
                }
                catch (e) {
                    console.error(`Error creating stage:`, stage, e);
                }
            }
        });
    }
    generateSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([this.generateStages(), this.generateSpeakers()]);
            const data = yield this.getDataForRange(SESSION_SHEET, SESSION_DATA_RANGE);
            for (const row of data) {
                try {
                    const [Name, Description, stageId, Day, Start, End, ...speakerIdsRaw] = row.slice(0, 11);
                    const speakerPromises = speakerIdsRaw
                        .filter(Boolean)
                        .map((speakerId) => this.speakerController.getSpeaker((0, utils_1.generateId)(speakerId), this.event.id));
                    const [speakers, stage] = yield Promise.all([Promise.all(speakerPromises), this.stageController.getStage((0, utils_1.generateId)(stageId), this.event.id)]);
                    const session = {
                        name: Name,
                        description: Description,
                        stageId: stage.id,
                        eventId: this.event.id,
                        organizationId: this.event.organizationId,
                        speakers: speakers,
                        start: moment_timezone_1.default.tz(`${Day} ${Start}:00`, this.event.timezone).valueOf(),
                        end: moment_timezone_1.default.tz(`${Day} ${End}:00`, this.event.timezone).valueOf(),
                        videoUrl: row[11],
                    };
                    yield this.sessionController.createSession(session);
                }
                catch (e) {
                    console.error(`Error creating session:`, e);
                }
            }
        });
    }
}
exports.default = Importer;
