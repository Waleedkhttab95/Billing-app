export class HttpRequestError extends Error {
	private readonly _statusCode: number;
	private readonly _responseBody: {
		"message": string,
		"errorCode": number,
		"details": string,
		"isError": boolean,
		"data": string | null
	};

	constructor(statusCode: number, message: string) {
		super(message);
		this._statusCode = statusCode;
		this._responseBody = {
		"message": "Faild",
		"errorCode": statusCode,
		"details": message,
		"isError": true,
		"data": null
		};
	}

	// get statusCode() {
	// 	return this._statusCode;
	// }

	// get responseBody() {
	// 	return this._responseBody;
	// }
}