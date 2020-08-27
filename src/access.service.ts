import { AccessConfig, AccessSettingsResponse } from "./interfaces/access.interface";

export class AccessService {
    private redisClient: any;

    constructor(redis: any){
        this.redisClient = redis.getRedisConnection();
    }
    public setSettings(buildingID: string, settings: AccessConfig){
        return new Promise((resolve)=>{
            this.redisClient.set("building:access:"+buildingID, JSON.stringify(settings));
            resolve({error: null});
        })
    }
    public getSettings(buildingID: string): Promise<AccessSettingsResponse>{
        return new Promise((resolve)=>{
            this.redisClient.get("building:access:"+buildingID)
            .then((res: any)=>resolve((res) ? {error: null, res: JSON.parse(res)} : {error: null, res: null}))
            .catch((err: any)=>resolve({error: err}))
        })
    }
}