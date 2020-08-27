import { ParkingSettings, ParkingSettingsResponse, LPREventModel } from "./interfaces/parking.interface";
const AWS = require('aws-sdk');

export class ParkingService {
    private redisClient: any;

    constructor(redis: any){
        this.redisClient = redis.getRedisConnection();
    }
    
    public setSettings(buildingID: string, parkingSettings: ParkingSettings){
        return new Promise((resolve)=>{
            this.redisClient.set("building-parking-settings"+buildingID), JSON.stringify(parkingSettings);
            resolve({error: null});
        })
    }
    public getSettings(buildingID: string): Promise<ParkingSettingsResponse>{
        return new Promise((resolve)=>{
            this.redisClient.get("building-parking-settings"+buildingID)
            .then((res: any)=>resolve((res) ? {error: null, res: JSON.parse(res)} : {error: null, res: null}))
            .catch((err: any)=>resolve({error: err}))
        })
    }
    public publishLPREvent(parkingEvent: LPREventModel){
        this.redisClient.publish("parking:events:"+parkingEvent.garageID,JSON.stringify({
            plate: parkingEvent.plate,
            region: parkingEvent.region,
            confidence: parkingEvent.confidence,
            readerID: parkingEvent.reader,
            garageID: parkingEvent.garageID,
            epoch: {
                state: parkingEvent.epoch_start,
                end: parkingEvent.epoch_end
            },
            direction: parkingEvent.travel_direction,
            is_parked: parkingEvent.parked,
            is_preview: parkingEvent.preview,
            processing_time: parkingEvent.processing_time,
            uuid: parkingEvent.uuid
        }));
        this.saveVehicleImage(parkingEvent.plate_image, parkingEvent.uuid);
    }
    public saveVehicleImage(encoded: string, uuid: string){
        var buf = Buffer.from(encoded.replace(/^data:image\/\w+;base64,/, ""),'base64')
        var s3Bucket = new AWS.S3( { params: {Bucket: 'parking-vehicle-images'} } );
        var data: any = {
            Key: uuid, 
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        };
        s3Bucket.putObject(data, (err: any, data: any)=>{});
    }
}