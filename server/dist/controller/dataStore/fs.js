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
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const path = __importStar(require("path"));
class FsController {
    constructor() {
        this.readFileAsync = (0, util_1.promisify)(fs_1.default.readFile);
        this.writeFileAsync = (0, util_1.promisify)(fs_1.default.writeFile);
        // @ts-ignore
        this.mkdirAsync = (0, util_1.promisify)(fs_1.default.mkdir);
        this.accessAsync = (0, util_1.promisify)(fs_1.default.access);
        this.readdirAsync = (0, util_1.promisify)(fs_1.default.readdir);
    }
    read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.readFileAsync(path, { encoding: "utf8" });
            }
            catch (e) {
                return "";
            }
        });
    }
    readAll(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.readdirAsync(path);
            }
            catch (e) {
                return [];
            }
        });
    }
    write(filePath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const directory = path.dirname(filePath);
            yield this.mkdirAsync(directory, { recursive: true });
            return this.writeFileAsync(filePath, data, { encoding: "utf8" });
        });
    }
    pathExists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.accessAsync(path, fs_1.default.constants.F_OK);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.default = FsController;
