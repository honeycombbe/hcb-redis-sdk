"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = void 0;
var AWS = require('aws-sdk');
var ParkingService = /** @class */ (function () {
    function ParkingService(redis) {
        this.redisClient = redis.getRedisConnection();
    }
    ParkingService.prototype.setSettings = function (buildingID, parkingSettings) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.set("building-parking-settings" + buildingID), JSON.stringify(parkingSettings);
            resolve({ error: null });
        });
    };
    ParkingService.prototype.getSettings = function (buildingID) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.redisClient.get("building-parking-settings" + buildingID)
                .then(function (res) { return resolve((res) ? { error: null, res: JSON.parse(res) } : { error: null, res: null }); })
                .catch(function (err) { return resolve({ error: err }); });
        });
    };
    ParkingService.prototype.publishLPREvent = function (parkingEvent) {
        this.redisClient.publish("parking:events:" + parkingEvent.garageID, JSON.stringify({
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
    };
    ParkingService.prototype.saveVehicleImage = function (encoded, uuid) {
        var buf = Buffer.from(encoded.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var s3Bucket = new AWS.S3({ params: { Bucket: 'parking-vehicle-images' } });
        var data = {
            Key: uuid,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        };
        s3Bucket.putObject(data, function (err, data) { });
    };
    return ParkingService;
}());
exports.ParkingService = ParkingService;
