"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
class Session {
    constructor({ name, description, start, end, stageId, speakers, source, videoUrl, eventId, track, coverImage, }) {
        this.id = (0, utils_1.generateId)(name);
        this.name = name;
        this.description = description;
        this.start = start;
        this.end = end;
        this.stageId = stageId;
        this.speakers = speakers;
        this.source = source;
        this.videoUrl = videoUrl;
        this.playbackId = this.getPlaybackId();
        this.eventId = eventId;
        this.track = track;
        this.coverImage = coverImage !== null && coverImage !== void 0 ? coverImage : '/sessions/' + this.eventId + '/' + this.id + '.jpg';
        this.validateThis();
    }
    validateThis() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(this);
            if (errors.length > 0) {
                throw new Error(`Validation failed! ${errors}`);
            }
        });
    }
    getDate() {
        return {
            start: new Date(this.start),
            end: new Date(this.end),
        };
    }
    toJson() {
        return Object.assign({}, this);
    }
    getPlaybackId() {
        var _a;
        if (this.playbackId) {
            return this.playbackId;
        }
        else if (this.videoUrl) {
            // https://lp-playback.com/hls/73e7hmd7ch7k8bnw/index.m3u8
            return (_a = this.videoUrl.split('/')) === null || _a === void 0 ? void 0 : _a[4];
        }
        return '';
    }
    static getSessionDate(date) {
        return new Date(date).toISOString();
    }
    static getSessionTime(date) {
        return date.toLocaleTimeString();
    }
    static fromJson(jsonData) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            const session = new Session(Object.assign({}, data));
            yield session.validateThis();
            return session;
        });
    }
    static getSessionPath(eventId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sessionId) {
                return path_1.default.join(utils_1.BASE_PATH, 'sessions', eventId, `${sessionId}.json`);
            }
            return path_1.default.join(utils_1.BASE_PATH, 'sessions', eventId);
        });
    }
    static getSessionImagePath(eventId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return path_1.default.join(utils_1.PUBLIC_PATH, 'sessions', eventId, `${sessionId}.jpg`);
        });
    }
    static getSessionImageDirectory(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return path_1.default.join(utils_1.PUBLIC_PATH, 'sessions', eventId);
        });
    }
}
exports.default = Session;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Session.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Session.prototype, "start", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Session.prototype, "stageId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], Session.prototype, "speakers", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Session.prototype, "eventId", void 0);
