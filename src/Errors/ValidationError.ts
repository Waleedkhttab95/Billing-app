import {HttpRequestError} from "./HttpRequestError";

export class ValidationError extends HttpRequestError {

    constructor(message: string) {
        super(400, message);
    }
}

