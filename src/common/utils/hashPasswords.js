import bcrypt from "bcrypt";

const hashPassword = async (user) => {
  user.password = await bcrypt.hash(user.dataValues.password, 10);
};

export default hashPassword;
