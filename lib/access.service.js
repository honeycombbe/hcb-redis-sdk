"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessService = void 0;
var AccessService = /** @class */ (function () {
    function AccessService(redis) {
        this.redisClient = redis.getRedisConnection();
    }
    AccessService.prototype.setSettings = function (buildingID, settings) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.set("building:access:" + buildingID, JSON.stringify(settings));
            resolve({ error: null });
        });
    };
    AccessService.prototype.getSettings = function (buildingID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.get("building:access:" + buildingID)
                .then(function (res) { return resolve((res) ? { error: null, res: JSON.parse(res) } : { error: null, res: null }); })
                .catch(function (err) { return resolve({ error: err }); });
        });
    };
    return AccessService;
}());
exports.AccessService = AccessService;
