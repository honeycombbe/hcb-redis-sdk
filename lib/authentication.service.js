"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(redis) {
        this.redisClient = redis.getRedisConnection();
    }
    AuthenticationService.prototype.setAuth = function (nonce, expires) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.set("auth:tracker:" + nonce, JSON.stringify({ expires: expires }));
            resolve({ error: null });
        });
    };
    AuthenticationService.prototype.getAuth = function (nonce) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.get("auth:tracker:" + nonce)
                .then(function (res) {
                if (!res) {
                    return resolve({ status: false });
                }
                else {
                    var decoded = JSON.parse(res);
                    if (parseInt(decoded.expires.toString()) < Math.floor(new Date().getTime() / 1000)) {
                        _this.redisClient.del("auth:tracker:" + nonce);
                        return resolve({ status: false });
                    }
                    else {
                        return resolve({ status: true });
                    }
                }
            })
                .catch(function (err) {
                return resolve({ status: false });
            });
        });
    };
    AuthenticationService.prototype.delAuth = function (nonce) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.del("auth:tracker:" + nonce);
            resolve({ error: null });
        });
    };
    AuthenticationService.prototype.setLockout = function (userID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.set("auth:lock:" + userID, JSON.stringify({ locked: Math.floor(new Date().getTime() / 1000) }));
            resolve({ error: null });
        });
    };
    AuthenticationService.prototype.getLockout = function (userID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.get("auth:lock:" + userID)
                .then(function (res) {
                if (res) {
                    var decoded = JSON.parse(res);
                    return resolve({ status: true, locked: parseInt(decoded.locked.toString()) });
                }
                else {
                    return resolve({ status: false });
                }
            })
                .catch(function (err) {
                return resolve({ status: false });
            });
        });
    };
    AuthenticationService.prototype.delLockout = function (userID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.del("auth:lock:" + userID);
            resolve({ error: null });
        });
    };
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
