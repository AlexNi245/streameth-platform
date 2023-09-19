import BaseImporter from '../baseImporter';
import Event, { IDataImporter } from '../../model/event';
export default class Importer extends BaseImporter {
    sheetId: string;
    apiKey: string;
    connection: any;
    constructor({ importer, event }: {
        importer: IDataImporter;
        event: Event;
    });
    private connectToGoogleSheets;
    private getDataForRange;
    generateSpeakers(): Promise<void>;
    generateStages(): Promise<void>;
    generateSessions(): Promise<void>;
}
