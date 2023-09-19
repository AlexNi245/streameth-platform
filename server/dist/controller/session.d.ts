import Session, { ISession } from '../model/session';
export declare class SessionController {
    private controller;
    constructor();
    getSession(sessionId: ISession['id'], eventId: ISession['eventId']): Promise<Session>;
    createSession(session: Omit<ISession, 'id'>): Promise<Session>;
    getAllSessions({ eventId, stage, timestamp, date, speakerIds, }: {
        eventId: ISession['eventId'];
        stage?: ISession['stageId'];
        timestamp?: number;
        date?: number;
        speakerIds?: string[];
    }): Promise<Session[]>;
}
