const errorHandlerMiddleware = (err, req, res, next) => {
  //Cast Error
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: `Resource with id: ${err.value} not found`,
    });
  }

  //Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ message });
  }

  //Duplicate Key Error
  if (err.code && err.code === 11000) {
    return res.status(409).json({
      message: `${Object.keys(err.keyValue)}: ${Object.values(
        err.keyValue
      )} already exists`,
    });
  }

  return res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = errorHandlerMiddleware;
