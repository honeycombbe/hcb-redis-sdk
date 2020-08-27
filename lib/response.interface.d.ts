export interface ResponseHeaders {
    'Access-Control-Allow-Origin': string;
    'Content-Type': string;
    'Access-Control-Allow-Headers': string;
}
export interface HttpResponse {
    statusCode: number;
    headers: ResponseHeaders;
    body: string;
    isBase64Encoded: boolean;
}
