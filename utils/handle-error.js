function sendError(errorMessage, req, res, statusCode = 500) {
  const isAjax = req.xhr;

  if (isAjax) {
    res.status(statusCode).send(errorMessage);
  } else {
    res.status(statusCode).render("error", {
      title: "Error Page",
      revert_link: "toRoot",
      error: errorMessage,
      layout: null,
    });
  }
}

// eslint-disable-next-line no-unused-vars
module.exports.handleErrorMiddleware = (error, req, res, next) => {
  //TODO: Send mail and log error to file
  globalThis.logger.error(error);

  sendError(error.message, req, res);
};

module.exports.ifDepartmentNotFoundThrowError = (req, res, next) => {
  const departmentPath = req.baseUrl.slice(1).toLowerCase();
  req.department = globalThis.departmentMap[departmentPath];

  if (!req.department) {
    return next(new Error("It is not department route"));
  }

  next();
};

module.exports.redirectToOtherRoutesIfDepartmentNotFound = (error, req, res, next) => {
  if (error.message !== "It is not department route") {
    return next(error);
  }

  next();
};

module.exports.sendError = sendError;
