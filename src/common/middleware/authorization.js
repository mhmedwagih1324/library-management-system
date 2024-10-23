import _ from "lodash";

/**
 *
 * @param {Object} user
 * @param {Array} roles
 * @returns
 */
export const isAuthorized = (user, roles) => {
  let haveAccess = true;

  if (!_.isNil(roles) && _.isArray(roles)) {
    haveAccess = roles.includes(user.baseRole.name);
  }

  return haveAccess;
};
