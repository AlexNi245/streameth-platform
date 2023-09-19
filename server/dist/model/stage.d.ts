import { IEvent } from './event';
export interface IStreamSettings {
    streamId: string;
}
export interface IPlugin {
    name: string;
}
export interface IStage {
    id: string;
    name: string;
    eventId: IEvent['id'];
    streamSettings: IStreamSettings;
    plugins?: IPlugin[];
    order?: number;
}
export default class Stage implements IStage {
    id: string;
    name: string;
    eventId: IEvent['id'];
    streamSettings: IStreamSettings;
    plugins?: IPlugin[];
    order?: number;
    constructor({ name, eventId, streamSettings, plugins, order }: Omit<IStage, 'id'> & {
        id?: string;
    });
    validateThis(): Promise<void>;
    toJson(): IStage;
    static fromJson(jsonData: string | Omit<IStage, 'id'>): Promise<Stage>;
    static getStagePath(eventId: IStage['eventId'], stageId?: IStage['id']): Promise<string>;
}
