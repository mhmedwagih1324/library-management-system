/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  return res.status(err.status).json(err.message);
};

export default errorHandler;
