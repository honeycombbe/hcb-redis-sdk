export interface AccessConfig {
    enabled: boolean;
    location?: LocationAccessConfig;
    network?: NetworkAccessConfig;
}
export interface LocationAccessConfig {
    enabled: boolean;
    distance?: number;
    coords?: LocationCoordsAccessConfig;
}
export interface LocationCoordsAccessConfig {
    lat: number;
    lng: number;
}
export interface NetworkAccessConfig {
    enabled: boolean;
    key?: string;
    ping?: NetworkPingAccessConfig;
    urls?: Array<string>;
}
export interface NetworkPingAccessConfig {
    in: number;
    out: number;
}
export interface AccessSettingsResponse {
    error: any;
    res?: AccessConfig;
}
