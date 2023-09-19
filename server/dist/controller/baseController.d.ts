import FsController from './dataStore/fs';
interface IBaseController<T> {
    create: (query: string, data: T) => Promise<void>;
    get: (query: string) => Promise<T>;
    getAll: (query: string) => Promise<T[]>;
}
type StoreType = 'fs' | 'db';
export default class BaseController<T> implements IBaseController<T> {
    store: FsController;
    constructor(store: StoreType);
    create(query: string, data: T): Promise<void>;
    get(query: string): Promise<T>;
    getAll(query: string): Promise<T[]>;
}
export {};
