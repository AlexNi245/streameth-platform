import SpeakerController from "../controller/speaker";
import EventController from "../controller/event";
import SessionController from "../controller/session";
import StageController from "../controller/stage";
import Event from "../model/event";
export interface IBaseImporter {
    generateSessions(): Promise<void>;
    generateStages(): Promise<void>;
    generateSpeakers(): Promise<void>;
}
export default class BaseImporter implements IBaseImporter {
    speakerController: SpeakerController;
    eventController: EventController;
    sessionController: SessionController;
    stageController: StageController;
    event: Event;
    constructor(event: Event);
    generateSessions(): Promise<void>;
    generateStages(): Promise<void>;
    generateSpeakers(): Promise<void>;
}
