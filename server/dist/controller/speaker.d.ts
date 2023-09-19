import Speaker, { ISpeaker } from "../model/speaker";
export default class SpeakerController {
    private controller;
    constructor();
    getSpeaker(speakerId: ISpeaker["id"], eventId: ISpeaker["eventId"]): Promise<Speaker>;
    createSpeaker(speaker: Omit<ISpeaker, "id">): Promise<Speaker>;
    getAllSpeakersForEvent(eventId: ISpeaker["eventId"]): Promise<Speaker[]>;
}
