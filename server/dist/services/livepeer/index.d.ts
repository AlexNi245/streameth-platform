declare class LivepeerService {
    private apiUrl;
    private apiToken;
    private httpClient;
    constructor();
    getSessionData(id: string): Promise<any>;
}
export default LivepeerService;
