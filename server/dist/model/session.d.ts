import { IStage } from './stage';
import Speaker from './speaker';
import { IEvent } from './event';
export interface ISource {
    streamUrl: string;
    start: number;
    end: number;
}
export interface IPlayback {
    livepeerId: string;
    videoUrl: string;
    ipfsHash: string;
    format: string;
    duration: number;
}
export interface ISession {
    id: string;
    name: string;
    description: string;
    start: number;
    end: number;
    stageId: IStage['id'];
    speakers: Speaker[];
    source?: ISource;
    playback?: IPlayback;
    videoUrl?: string;
    playbackId?: string;
    eventId: IEvent['id'];
    track?: string[];
    coverImage?: string;
}
export default class Session implements ISession {
    id: string;
    name: string;
    description: string;
    start: number;
    end: number;
    stageId: IStage['id'];
    speakers: Speaker[];
    source?: ISource;
    videoUrl?: string;
    playbackId?: string;
    eventId: IEvent['id'];
    track?: string[];
    coverImage?: string;
    constructor({ name, description, start, end, stageId, speakers, source, videoUrl, eventId, track, coverImage, }: Omit<ISession, 'id'> & {
        id?: string;
    });
    validateThis(): Promise<void>;
    getDate(): {
        start: Date;
        end: Date;
    };
    toJson(): ISession;
    getPlaybackId(): string;
    static getSessionDate(date: Date): string;
    static getSessionTime(date: Date): string;
    static fromJson(jsonData: string | Promise<Session>): Promise<Session>;
    static getSessionPath(eventId: ISession['eventId'], sessionId?: ISession['id']): Promise<string>;
    static getSessionImagePath(eventId: ISession['eventId'], sessionId: ISession['id']): Promise<string>;
    static getSessionImageDirectory(eventId: ISession['eventId']): Promise<string>;
}
