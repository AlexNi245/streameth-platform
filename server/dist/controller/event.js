"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.EventController = void 0;
const baseController_1 = __importDefault(require("./baseController"));
const event_1 = __importDefault(require("../model/event"));
const organization_1 = require("./organization");
class EventController {
    constructor() {
        this.controller = new baseController_1.default('fs');
    }
    getEvent(eventId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventQuery = yield event_1.default.getEventPath(organizationId, eventId);
            const data = yield this.controller.get(eventQuery);
            const evt = new event_1.default(Object.assign({}, data));
            // !evt.archiveMode && this.importEventData(evt)
            return evt;
        });
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const evt = new event_1.default(Object.assign({}, event));
            yield evt.validateThis();
            const eventQuery = yield event_1.default.getEventPath(evt.organizationId, evt.id);
            yield this.controller.create(eventQuery, evt);
            return evt;
        });
    }
    getAllEventsForOrganization(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = [];
            const eventQuery = yield event_1.default.getEventPath(organizationId);
            const data = yield this.controller.getAll(eventQuery);
            for (const evt of data) {
                events.push(new event_1.default(Object.assign({}, evt)));
            }
            return events;
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const orgController = new organization_1.OrganizationController();
            const organizations = yield orgController.getAllOrganizations();
            const events = [];
            for (const organization of organizations) {
                const data = yield this.getAllEventsForOrganization(organization.id);
                events.push(...data);
            }
            return events;
        });
    }
    importEventData(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dataImporter } = event;
            if (!dataImporter)
                return;
            for (const importer of dataImporter) {
                const importedModule = yield Promise.resolve(`${`../importers/${importer.type}/index`}`).then(s => __importStar(require(s)));
                const Importer = importedModule.default;
                // Not typesafe
                const data = new Importer({ importer, event });
                return yield data.generateSessions();
            }
        });
    }
}
exports.EventController = EventController;
