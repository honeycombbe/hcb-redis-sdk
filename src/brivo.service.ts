import { BrivoAuthPayload } from "./interfaces/brivo.interface";

export class BrivoService {
    private redisClient: any;

    constructor(redis: any){
        this.redisClient = redis.getRedisConnection();
    }
    public setAuth(brivoPayload: BrivoAuthPayload){
        return new Promise((resolve)=>{
            this.redisClient.set("building:brivo:"+brivoPayload.buildingID, JSON.stringify(brivoPayload));
            resolve({error: null});
        })
    }
    public getAuth(buildingID: string): Promise<BrivoAuthResponse>{
        return new Promise((resolve)=>{
            this.redisClient.get("building:brivo:"+buildingID)
            .then((res: any)=>resolve((res) ? {error: null, res: JSON.parse(res)} : {error: null, res: null}))
            .catch((err: any)=>resolve({error: err}))
        })
    }
}

export interface BrivoAuthResponse {
    error: any;
    res?: BrivoAuthPayload;
}