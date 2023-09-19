import BaseImporter from '../baseImporter';
import { IDataImporter } from '../../model/event';
import Event from '../../model/event';
export default class PretalxImporter extends BaseImporter {
    apiUrl: string;
    constructor({ importer, event }: {
        importer: IDataImporter;
        event: Event;
    });
    generateSpeakers(): Promise<void>;
    generateStages(): Promise<void>;
    generateSessions(): Promise<void>;
}
