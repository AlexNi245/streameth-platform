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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const directoryPath = path.join(__dirname, '../../data/sessions/');
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory:', err);
    }
    files.forEach((file) => {
        if (file.startsWith('zuzalu_montenegro_2023')) {
            const fullPath = path.join(directoryPath, file);
            fs.readdir(fullPath, (err, jsonFiles) => {
                if (err) {
                    return console.log('Unable to scan subdirectory:', err);
                }
                jsonFiles.forEach((jsonFile) => {
                    if (jsonFile.endsWith('.json')) {
                        const jsonPath = path.join(fullPath, jsonFile);
                        fs.readFile(jsonPath, 'utf8', (err, data) => {
                            if (err) {
                                return console.log('Unable to read file:', err);
                            }
                            let jsonData = JSON.parse(data);
                            jsonData.coverImage = '/sessions/zuzalu_montenegro_2023/zuzalu_thumbnail.jpg';
                            fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                                if (err) {
                                    return console.log('Unable to write file:', err);
                                }
                                console.log(`Updated coverImage in ${jsonFile}`);
                            });
                        });
                    }
                });
            });
        }
    });
});
