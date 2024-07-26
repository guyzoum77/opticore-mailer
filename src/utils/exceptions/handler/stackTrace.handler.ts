import {LogMessageCore} from "opticore-console-log-message";
import {HttpStatusCodesConstant as status} from "../../constants/httpStatusCode.constant";

/**
 * Handling and catch a Node.js error.
 */
export default class StackTraceHandler extends Error {
    public readonly name: string;
    public readonly httpCode: status;
    public readonly isOperational: boolean;

    // Centralized error objet that derives from Node's Error.
    constructor(props: string | undefined, name: string, message: string, httpCode: status, isOperational: boolean) {
        super(props);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.message = message;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        LogMessageCore.error(Error.toString(), (Error.name), (this.stack! || this.message), status.NOT_ACCEPTABLE)
        Error.captureStackTrace(
             this,
            () => {
                return this;
            }
        );
    }
}