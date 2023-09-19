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
class Event {
    constructor({ id, name, description, start, end, location, organizationId, dataImporter, eventCover, archiveMode, website, timezone, logo, banner }) {
        this.id = id !== null && id !== void 0 ? id : (0, utils_1.generateId)(name);
        this.name = name;
        this.description = description;
        this.start = new Date(start);
        this.end = new Date(end);
        this.location = location;
        this.organizationId = organizationId;
        this.dataImporter = dataImporter;
        this.eventCover = eventCover ? eventCover : id + '.png';
        this.website = website;
        this.archiveMode = archiveMode !== null && archiveMode !== void 0 ? archiveMode : true;
        this.timezone = timezone !== null && timezone !== void 0 ? timezone : 'utc';
        this.logo = logo;
        this.banner = banner;
        // this.validateThis();
    }
    validateThis() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(this);
            if (errors.length > 0) {
                throw new Error(`Validation failed! ${errors}`);
            }
        });
    }
    toJson() {
        return Object.assign({}, this);
    }
    static fromJson(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = typeof json === 'string' ? JSON.parse(json) : json;
            const evt = new Event(Object.assign({}, data));
            return evt;
        });
    }
    static getEventPath(organizationId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (eventId) {
                return path_1.default.join(utils_1.BASE_PATH, 'events', organizationId, `${eventId}.json`);
            }
            return path_1.default.join(utils_1.BASE_PATH, 'events', organizationId);
        });
    }
}
exports.default = Event;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Event.prototype, "organizationId", void 0);
