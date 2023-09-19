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
const stage_1 = __importDefault(require("../model/stage"));
const event_1 = __importDefault(require("./event"));
class StageController {
    constructor() {
        this.controller = new baseController_1.default('fs');
    }
    createStage(stage) {
        return __awaiter(this, void 0, void 0, function* () {
            const ses = new stage_1.default(Object.assign({}, stage));
            const stageQuery = yield stage_1.default.getStagePath(ses.eventId, ses.id);
            yield this.controller.create(stageQuery, ses);
            return ses;
        });
    }
    getStage(stageId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const stageQuery = yield stage_1.default.getStagePath(eventId, stageId);
            const data = yield this.controller.get(stageQuery);
            return new stage_1.default(Object.assign({}, data));
        });
    }
    getAllStages() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventController = new event_1.default();
            const events = yield eventController.getAllEvents();
            const stages = [];
            for (const event of events) {
                const data = yield this.getAllStagesForEvent(event.id);
                stages.push(...data);
            }
            return stages;
        });
    }
    getAllStagesForEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const stages = [];
            const stageQuery = yield stage_1.default.getStagePath(eventId);
            const data = yield this.controller.getAll(stageQuery);
            for (const ses of data) {
                stages.push(new stage_1.default(Object.assign({}, ses)));
            }
            stages.sort((a, b) => {
                if ((a === null || a === void 0 ? void 0 : a.order) && (b === null || b === void 0 ? void 0 : b.order)) {
                    return a.order - b.order;
                }
                return 0;
            });
            return stages;
        });
    }
}
exports.default = StageController;
