export interface AuthenticationResponse {
    status: boolean;
}
export interface AuthenticationLockoutResponse {
    status: boolean;
    locked?: number;
}
