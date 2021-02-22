abstract class CustomError extends Error {
  constructor(msg: string) {
    console.log(`Error: ${msg}`);
    super(msg);
  }
}

export class NetworkError extends CustomError {
  constructor(msg: string) {
    // Insert custom error handlng
    const updatedMsg = `Network Error received: ${msg}`;
    super(updatedMsg);
  }
}

export class ApiError extends CustomError {
  constructor(msg: string) {
    // Insert custom error handlng
    const updatedMsg = `API Error received: ${msg}`;
    super(updatedMsg);
  }
}

export class ValidationError extends CustomError {
  constructor(msg: string) {
    // Insert custom error handlng
    const updatedMsg = `Validation Error received: ${msg}`;
    super(updatedMsg);
  }
}

export class DeveloperError extends CustomError {
  constructor(msg: string) {
    // Insert custom error handlng
    const updatedMsg = `Developer Error received: ${msg}`;
    super(updatedMsg);
  }
}
