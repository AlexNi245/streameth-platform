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
const fs_1 = __importDefault(require("./dataStore/fs"));
const fs_2 = __importDefault(require("fs"));
class BaseController {
    constructor(store) {
        switch (store) {
            case 'fs':
                this.store = new fs_1.default();
                break;
            // case 'db':
            //   this.store = new DbController();
            //   break;
            default:
                throw new Error(`Unsupported store type: ${store}`);
        }
    }
    create(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.write(query, JSON.stringify(data));
        });
    }
    get(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fs_2.default.lstatSync(query).isDirectory()) {
                console.error(`${query} is a directory, not a file.`);
                process.exit(1);
            }
            return this.store.read(query).then((data) => JSON.parse(data));
        });
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.store.readAll(query);
            const dataPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const data = yield this.store.read(`${query}/${file}`);
                try {
                    return JSON.parse(data);
                }
                catch (e) {
                    console.error(`Error parsing JSON from ${query}/${file}`);
                    throw e;
                }
            }));
            return Promise.all(dataPromises);
        });
    }
}
exports.default = BaseController;
