import Joi from "joi";

export default {
  regiterPage: (req, res, next) => {
    let registerPageSchema = Joi.object({
      username: Joi.string().alphanum().min(4).required(),
      password: Joi.string().alphanum().min(8).required()
    });

    console.log(req.body)

    next()
  },
};
