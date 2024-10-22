import httpStatus from "http-status";

const { INTERNAL_SERVER_ERROR } = httpStatus;

class APIError extends Error {
  constructor({ errorCode, message, status = INTERNAL_SERVER_ERROR }) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.errorCode = errorCode;
  }
}

export default APIError;
