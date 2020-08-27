export interface ParkingSettings {
    master: Array<string>;
    designations: Array<string>;
    readers: Array<string>;
}
export interface ParkingSettingsResponse {
    error: any;
    res?: ParkingSettings;
}
export interface LPREventModel {
    plate: string;
    region: string;
    confidence: number;
    reader: string;
    garageID: string;
    epoch_start: number;
    epoch_end: number;
    travel_direction: number;
    preview: boolean;
    parked: boolean;
    processing_time: number;
    uuid: string;
    plate_image: string;
}
