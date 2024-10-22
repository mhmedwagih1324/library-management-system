import _ from "lodash";
import Joi from "joi";
import httpStatus from "http-status";

const { BAD_REQUEST } = httpStatus;

export const validate = (schema) => {
  const { params = {}, query = {}, body = {} } = schema;

  const compiledParams = Joi.compile(params);
  const compiledQuery = Joi.compile(query);
  const compiledBody = Joi.compile(body);

  return (req, res, next) => {
    if (!_.isEmpty(params)) {
      const { value: validatedParams, error } = compiledParams.validate(
        req.params
      );

      if (!_.isNil(error)) {
        error.source = "params";
        error.status = BAD_REQUEST;
        return next(error);
      }

      req.params = validatedParams;
    }

    if (!_.isEmpty(query)) {
      const { value: validatedQuery, error } = compiledQuery.validate(
        req.query
      );

      if (!_.isNil(error)) {
        error.source = "query";
        error.status = BAD_REQUEST;
        return next(error);
      }

      req.query = validatedQuery;
    }

    if (!_.isEmpty(body)) {
      const { value: validatedBody, error } = compiledBody.validate(req.body);

      if (!_.isNil(error)) {
        error.source = "body";
        error.status = BAD_REQUEST;
        return next(error);
      }

      req.body = validatedBody;
    }

    next();
  };
};
