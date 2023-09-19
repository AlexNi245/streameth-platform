import { IEvent } from './model/event';
export declare const generateId: (key: string) => string;
export declare const BASE_PATH: string;
export declare const PUBLIC_PATH = "../public";
export declare const IMAGE_BASE_PATH: string;
export declare const hasData: ({ event }: {
    event: IEvent;
}) => boolean;
export declare const apiUrl: () => "http://localhost:3000/api" | "https://app.streameth.org/api";
