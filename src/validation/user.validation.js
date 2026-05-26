import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),

  age: Joi.number().min(18).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 18",
    "any.required": "Age is required",
  }),

  address: Joi.string().required().messages({
    "string.base": "Address must be a string",
    "any.required": "Address is required",
  }),
});

export default userValidationSchema;
