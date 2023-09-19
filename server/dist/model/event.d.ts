import { IOrganization } from './organization';
export interface GSheetConfig {
    sheetId: string;
    apiKey: string;
}
export interface PretalxConfig {
    url: string;
    apiToken: string;
}
export type IDataImporter = {
    type: 'gsheet';
    config: GSheetConfig;
} | {
    type: 'pretalx';
    config: PretalxConfig;
};
export interface IEvent {
    id: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
    location: string;
    logo?: string;
    banner?: string;
    organizationId: IOrganization['id'];
    dataImporter?: IDataImporter[];
    eventCover?: string;
    archiveMode?: boolean;
    website?: string;
    timezone: string;
}
export default class Event implements IEvent {
    id: string;
    name: string;
    description: string;
    start: Date;
    end: Date;
    logo?: string;
    location: string;
    organizationId: string;
    dataImporter: IDataImporter[] | undefined;
    eventCover?: string;
    archiveMode?: boolean;
    website?: string;
    banner?: string;
    timezone: string;
    constructor({ id, name, description, start, end, location, organizationId, dataImporter, eventCover, archiveMode, website, timezone, logo, banner }: Omit<IEvent, 'id'> & {
        id?: string;
    });
    validateThis(): Promise<void>;
    toJson(): IEvent;
    static fromJson(json: string): Promise<Event>;
    static getEventPath(organizationId: string, eventId?: string): Promise<string>;
}
