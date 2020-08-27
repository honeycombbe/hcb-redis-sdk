"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrivoService = void 0;
var BrivoService = /** @class */ (function () {
    function BrivoService(redis) {
        this.redisClient = redis.getRedisConnection();
    }
    BrivoService.prototype.setAuth = function (brivoPayload) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.set("building:brivo:" + brivoPayload.buildingID, JSON.stringify(brivoPayload));
            resolve({ error: null });
        });
    };
    BrivoService.prototype.getAuth = function (buildingID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.get("building:brivo:" + buildingID)
                .then(function (res) { return resolve((res) ? { error: null, res: JSON.parse(res) } : { error: null, res: null }); })
                .catch(function (err) { return resolve({ error: err }); });
        });
    };
    return BrivoService;
}());
exports.BrivoService = BrivoService;
