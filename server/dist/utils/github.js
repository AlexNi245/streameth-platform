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
exports.GetFile = exports.AddOrUpdateFile = void 0;
const GITHUB_ORG = 'streamethorg';
const GITHUB_REPO = 'streameth-platform';
const DEFAULT_FOLDER = 'data';
function AddOrUpdateFile(filename, data, folder = DEFAULT_FOLDER) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Add or Update file', filename, folder);
        if (!process.env.GITHUB_API_TOKEN) {
            throw new Error('GITHUB_API_TOKEN not set');
        }
        let sha = '';
        const file = yield GetFile(filename, folder);
        if (file) {
            sha = file.sha;
        }
        try {
            const response = yield fetch(`https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/contents/${folder}/${filename}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                    Accept: 'application/vnd.github+json',
                },
                body: JSON.stringify({
                    message: `[av] ${filename}`,
                    committer: {
                        name: 'github_actions',
                        email: 'github-actions[bot]@users.noreply.github.com',
                    },
                    sha: sha,
                    content: Buffer.from(data).toString('base64'),
                }),
            });
            const body = yield response.json();
            return body;
        }
        catch (e) {
            console.error('ERROR', e);
        }
    });
}
exports.AddOrUpdateFile = AddOrUpdateFile;
function GetFile(filename, folder = DEFAULT_FOLDER) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Get file', filename, folder);
        try {
            const response = yield fetch(`https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/contents/${folder}/${filename}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                    Accept: 'application/vnd.github+json',
                },
            });
            const body = yield response.json();
            return body;
        }
        catch (e) {
            console.error('ERROR', e);
        }
    });
}
exports.GetFile = GetFile;
