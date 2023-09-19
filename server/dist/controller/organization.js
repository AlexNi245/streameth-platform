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
exports.OrganizationController = void 0;
const baseController_1 = __importDefault(require("./baseController"));
const organization_1 = __importDefault(require("../model/organization"));
class OrganizationController {
    constructor() {
        this.controller = new baseController_1.default("fs");
    }
    getOrganization(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizationQuery = yield organization_1.default.getOrganizationPath(organizationId);
            const data = yield this.controller.get(organizationQuery);
            return new organization_1.default(Object.assign({}, data));
        });
    }
    createOrganization(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            const org = new organization_1.default(Object.assign({}, organization));
            const organizationQuery = yield organization_1.default.getOrganizationPath(org.id);
            yield this.controller.create(organizationQuery, org);
            return org;
        });
    }
    getAllOrganizations() {
        return __awaiter(this, void 0, void 0, function* () {
            const organizations = [];
            const organizationQuery = yield organization_1.default.getOrganizationPath();
            const data = yield this.controller.getAll(organizationQuery);
            for (const org of data) {
                organizations.push(new organization_1.default(Object.assign({}, org)));
            }
            return organizations;
        });
    }
}
exports.OrganizationController = OrganizationController;
