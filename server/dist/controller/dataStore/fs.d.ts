export default class FsController {
    private readFileAsync;
    private writeFileAsync;
    private mkdirAsync;
    private accessAsync;
    private readdirAsync;
    constructor();
    read(path: string): Promise<string>;
    readAll(path: string): Promise<string[]>;
    write(filePath: string, data: string): Promise<void>;
    pathExists(path: string): Promise<boolean>;
}
