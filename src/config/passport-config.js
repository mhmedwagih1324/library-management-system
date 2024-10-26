import { config } from "../common/env-variables.js";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../api/models/users.js";
import _ from "lodash";

const jwtHandler = async (jwt_payload, done) => {
  const { id, email } = jwt_payload;

  let user = await User.findOne({ where: { id, email }, raw: true });

  if (_.isNil(user)) {
    return done(null, false);
  } else {
    return done(null, user);
  }
};

export const JwtStrategy = new Strategy(
  {
    secretOrKey: config.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  },
  jwtHandler
);
