import {HttpRequestError} from "./HttpRequestError";

export class ResourceNotFoundError extends HttpRequestError {
    constructor(resourceName: string) {
        super(404, "Could Not Find " + resourceName);
    }
}