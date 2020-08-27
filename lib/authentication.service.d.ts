import { AuthenticationLockoutResponse, AuthenticationResponse } from "./interfaces/auth.interface";
export declare class AuthenticationService {
    private redisClient;
    constructor(redis: any);
    setAuth(nonce: string, expires: number): Promise<unknown>;
    getAuth(nonce: string): Promise<AuthenticationResponse>;
    delAuth(nonce: string): Promise<unknown>;
    setLockout(userID: string): Promise<unknown>;
    getLockout(userID: string): Promise<AuthenticationLockoutResponse>;
    delLockout(userID: string): Promise<unknown>;
}
