export interface BrivoAuthPayload {
    buildingID: string;
    client: BrivoAuthPayloadClient;
    refresh_token: string;
}
export interface BrivoAuthPayloadClient {
    id: string;
    secret: string
}