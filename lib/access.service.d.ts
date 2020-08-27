import { AccessConfig, AccessSettingsResponse } from "./interfaces/access.interface";
export declare class AccessService {
    private redisClient;
    constructor(redis: any);
    setSettings(buildingID: string, settings: AccessConfig): Promise<unknown>;
    getSettings(buildingID: string): Promise<AccessSettingsResponse>;
}
