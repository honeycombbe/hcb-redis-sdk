import { RedisConfig } from './interfaces/redis.interface';
import { RedisService } from './redis.service';
import { BrivoService, BrivoAuthResponse } from './brivo.service';
import { ParkingService } from './parking.service';
import { AuthenticationService } from './authentication.service';
import { AccessService } from './access.service';
import { BrivoAuthPayload } from './interfaces/brivo.interface';
import { ParkingSettings, ParkingSettingsResponse, LPREventModel } from "./interfaces/parking.interface";
import { AccessConfig, AccessSettingsResponse } from './interfaces/access.interface';
import { AuthenticationLockoutResponse, AuthenticationResponse } from "./interfaces/auth.interface";

class HCBRedis {
  private redis: RedisService;
  private brivo: BrivoService;
  private parking: ParkingService;
  private authentication: AuthenticationService;
  private access: AccessService;

  constructor(private redisConfig: RedisConfig){
    this.redis = new RedisService(redisConfig);
    this.brivo = new BrivoService(this.redis);
    this.parking = new ParkingService(this.redis);
    this.authentication = new AuthenticationService(this.redis);
    this.access = new AccessService(this.redis);
  }

  //Brivo
  public brivoSet(config: BrivoAuthPayload){
    return new Promise(async (resolve)=>{
      const res: any = await this.brivo.setAuth(config);
      resolve(res);
    })
  }
  public brivoGet(buildingID: string): Promise<BrivoAuthResponse>{
    return new Promise(async (resolve)=>{
      const res: BrivoAuthResponse = await this.brivo.getAuth(buildingID);
      resolve(res);
    })
  }
  //Parking
  public parkingSetSettings(buildingID: string, settings: ParkingSettings){
    return new Promise(async (resolve)=>{
      const res: any = await this.parking.setSettings(buildingID, settings);
      resolve(res);
    })
  }
  public parkingGetSettings(buildingID: string): Promise<ParkingSettingsResponse>{
    return new Promise(async (resolve)=>{
      const res: ParkingSettingsResponse = await this.parking.getSettings(buildingID);
      resolve(res);
    })
  }
  public parkingLprEventPublish(parkingEvent: LPREventModel){
    this.parking.publishLPREvent(parkingEvent);
  }
  //Access
  public accessSetSettings(buildingID: string, settings: AccessConfig){
    return new Promise(async (resolve)=>{
      const res: any = await this.access.setSettings(buildingID, settings);
      resolve(res);
    })
  }
  public accessGetSettings(buildingID: string): Promise<AccessSettingsResponse>{
    return new Promise(async (resolve)=>{
      const res: AccessSettingsResponse = await this.access.getSettings(buildingID);
      resolve(res);
    })
  }
  //Authentication
  public authenticationSetAuth(nonce: string, expires: number){
    return new Promise(async (resolve)=>{
      const res: any = await this.authentication.setAuth(nonce, expires);
      resolve(res);
    })
  }
  public authenticationGetAuth(nonce: string): Promise<AuthenticationResponse>{
    return new Promise(async (resolve)=>{
      const res: AuthenticationResponse = await this.authentication.getAuth(nonce);
      resolve(res);
    })
  }
  public authenticationDelAuth(nonce: string){
    return new Promise(async (resolve)=>{
      const res: any = await this.authentication.delAuth(nonce);
      resolve(res);
    })
  }

  public authenticationSetLock(userID: string){
    return new Promise(async (resolve)=>{
      const res: any = await this.authentication.setLockout(userID);
      resolve(res);
    })
  }
  public authenticationGetLock(userID: string): Promise<AuthenticationLockoutResponse>{
    return new Promise(async (resolve)=>{
      const res: AuthenticationLockoutResponse = await this.authentication.getLockout(userID);
      resolve(res);
    })
  }
  public authenticationDelLock(userID: string){
    return new Promise(async (resolve)=>{
      const res: any = await this.authentication.delLockout(userID);
      resolve(res);
    })
  }
  
}

module.exports = HCBRedis;