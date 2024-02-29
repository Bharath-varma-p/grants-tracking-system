class BaseResult {
  constructor(message, data) {
    this.message = message;
    this.data = data;
    this.status = false;
  }
}

class SuccessResult extends BaseResult {
  constructor(data, message) {
    super(message, data);
    this.status = true;
  }
}

class ErrorResult extends BaseResult {
  constructor(message, error) {
    super(message);
    this.error = error ?? new Error(message);
  }
}

module.exports.SuccessResult = SuccessResult;
module.exports.ErrorResult = ErrorResult;
