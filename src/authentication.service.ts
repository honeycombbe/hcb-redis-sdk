import { AuthenticationLockoutResponse, AuthenticationResponse } from "./interfaces/auth.interface";

export class AuthenticationService {
    private redisClient: any;
    constructor(redis: any){
        this.redisClient = redis.getRedisConnection();
    }

    public setAuth(nonce: string, expires: number){
        return new Promise((resolve)=>{
            this.redisClient.set("auth:tracker:"+nonce,JSON.stringify({expires: expires}));
            resolve({error: null})
        })
    }
    public getAuth(nonce: string): Promise<AuthenticationResponse>{
        return new Promise((resolve)=>{
            this.redisClient.get("auth:tracker:"+nonce)
            .then((res: any)=>{
                if(!res){
                    return resolve({status: false})
                }else{
                    let decoded: any = JSON.parse(res);
                    if(parseInt(decoded.expires.toString()) < Math.floor(new Date().getTime() / 1000)){
                        this.redisClient.del("auth:tracker:"+nonce)
                        return resolve({status: false})
                    }else{
                        return resolve({status: true})
                    }
                }
            })
            .catch((err: any)=>{
                return resolve({status: false})
            })            
        })
    }
    public delAuth(nonce: string){
        return new Promise((resolve)=>{
            this.redisClient.del("auth:tracker:"+nonce)
            resolve({error: null})
        });
    }

    public setLockout(userID: string){
        return new Promise((resolve)=>{
            this.redisClient.set("auth:lock:"+userID,JSON.stringify({locked: Math.floor(new Date().getTime() / 1000)}));
            resolve({error: null})
        })
    }
    public getLockout(userID: string): Promise<AuthenticationLockoutResponse>{
        return new Promise((resolve)=>{
            this.redisClient.get("auth:lock:"+userID)
            .then((res: any)=>{
                if(res){
                    let decoded: any = JSON.parse(res);
                    return resolve({status: true, locked: parseInt(decoded.locked.toString())});
                }else{
                    return resolve({status: false});
                }
            })
            .catch((err: any)=>{
                return resolve({status: false})
            })            
        })
    }
    public delLockout(userID: string){
        return new Promise((resolve)=>{
            this.redisClient.del("auth:lock:"+userID)
            resolve({error: null})
        });
    }
}