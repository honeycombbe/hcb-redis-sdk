# Honeycomb Redis SDK

## Installation

```bash
npm i hcb-redis-sdk
```

## Usage

```javascript
const HCBRedis = require("hcb-redis-sdk");
const hcbsdk = new HCBRedis({port: number, host: string, password: string});


```

## Brivo Functions

#### brivoSet config definition
```json
{
    buildingID: string;
    client: {
        id: string;
        secret: string;
    }
}
```

```javascript
const HCBRedis = require("hcb-redis-sdk");
const hcbsdk = new HCBRedis({port: number, host: string, password: string});

hcbsdk.brivoSet(config);
```

#### brivoGet response definition
```json
{
    error: any;
    res: {
        buildingID: string;
        client: {
            id: string;
            secret: string;
        }
    }
}
```

```javascript
const HCBRedis = require("hcb-redis-sdk");
const hcbsdk = new HCBRedis({port: number, host: string, password: string});

hcbsdk.brivoGet(buildingID);
```