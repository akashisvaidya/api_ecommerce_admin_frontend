import adminUserSchema from "./adminUserSchema.js";
/// create new user

export const createAdmin = (obj) => {
  return adminUserSchema(obj).save();
};

// find user by filter. filter must be an object
export const findAdmin = (filter) => {
  return adminUserSchema.findOne(filter);
};
