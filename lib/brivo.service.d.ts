import { BrivoAuthPayload } from "./interfaces/brivo.interface";
export declare class BrivoService {
    private redisClient;
    constructor(redis: any);
    setAuth(brivoPayload: BrivoAuthPayload): Promise<unknown>;
    getAuth(buildingID: string): Promise<BrivoAuthResponse>;
}
export interface BrivoAuthResponse {
    error: any;
    res?: BrivoAuthPayload;
}
