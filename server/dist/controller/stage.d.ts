import Stage, { IStage } from '../model/stage';
export default class StageController {
    private controller;
    constructor();
    createStage(stage: Omit<IStage, 'id'>): Promise<Stage>;
    getStage(stageId: IStage['id'], eventId: IStage['eventId']): Promise<Stage>;
    getAllStages(): Promise<Stage[]>;
    getAllStagesForEvent(eventId: IStage['eventId']): Promise<Stage[]>;
}
