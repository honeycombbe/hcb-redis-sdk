import { ParkingSettings, ParkingSettingsResponse, LPREventModel } from "./interfaces/parking.interface";
export declare class ParkingService {
    private redisClient;
    constructor(redis: any);
    setSettings(buildingID: string, parkingSettings: ParkingSettings): Promise<unknown>;
    getSettings(buildingID: string): Promise<ParkingSettingsResponse>;
    publishLPREvent(parkingEvent: LPREventModel): void;
    saveVehicleImage(encoded: string, uuid: string): void;
}
