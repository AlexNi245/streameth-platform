import { IEvent } from "./event";
export interface ISpeaker {
    id: string;
    name: string;
    bio: string;
    eventId: IEvent["id"];
    twitter?: string;
    github?: string;
    website?: string;
    photo?: string;
}
export default class Speaker implements ISpeaker {
    id: string;
    name: string;
    bio: string;
    eventId: IEvent["id"];
    twitter?: string;
    github?: string;
    website?: string;
    photo?: string;
    constructor({ name, bio, eventId, twitter, github, website, photo, }: Omit<ISpeaker, "id"> & {
        id?: string;
    });
    validateThis(): Promise<void>;
    toJson(): ISpeaker;
    static fromJson(jsonData: string | Omit<ISpeaker, "id">): Promise<Speaker>;
    static getSpeakerPath(eventId: ISpeaker["eventId"], speakerId?: ISpeaker["id"]): Promise<string>;
}
