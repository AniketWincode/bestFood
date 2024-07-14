const AppError = require("./appError");

class UnauthorisedError extends AppError {
    constructor() {
        super(`User is not autthroised properly, 404`)
    }
}

module.exports = UnauthorisedError;