"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_service_1 = require("./redis.service");
var brivo_service_1 = require("./brivo.service");
var parking_service_1 = require("./parking.service");
var authentication_service_1 = require("./authentication.service");
var access_service_1 = require("./access.service");
var HCBRedis = /** @class */ (function () {
    function HCBRedis(redisConfig) {
        this.redisConfig = redisConfig;
        this.redis = new redis_service_1.RedisService(redisConfig);
        this.brivo = new brivo_service_1.BrivoService(this.redis);
        this.parking = new parking_service_1.ParkingService(this.redis);
        this.authentication = new authentication_service_1.AuthenticationService(this.redis);
        this.access = new access_service_1.AccessService(this.redis);
    }
    //Brivo
    HCBRedis.prototype.brivoSet = function (config) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.brivo.setAuth(config)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.brivoGet = function (buildingID) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.brivo.getAuth(buildingID)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    //Parking
    HCBRedis.prototype.parkingSetSettings = function (buildingID, settings) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parking.setSettings(buildingID, settings)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.parkingGetSettings = function (buildingID) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parking.getSettings(buildingID)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.parkingLprEventPublish = function (parkingEvent) {
        this.parking.publishLPREvent(parkingEvent);
    };
    //Access
    HCBRedis.prototype.accessSetSettings = function (buildingID, settings) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.access.setSettings(buildingID, settings)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.accessGetSettings = function (buildingID) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.access.getSettings(buildingID)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    //Authentication
    HCBRedis.prototype.authenticationSetAuth = function (nonce, expires) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authentication.setAuth(nonce, expires)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.authenticationGetAuth = function (nonce) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authentication.getAuth(nonce)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.authenticationDelAuth = function (nonce) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authentication.delAuth(nonce)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.authenticationSetLock = function (userID) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authentication.setLockout(userID)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.authenticationGetLock = function (userID) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authentication.getLockout(userID)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HCBRedis.prototype.authenticationDelLock = function (userID) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authentication.delLockout(userID)];
                    case 1:
                        res = _a.sent();
                        resolve(res);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return HCBRedis;
}());
module.exports = HCBRedis;
