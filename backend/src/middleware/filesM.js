import Joi from "joi";

export default {
  addNewFile: (req, res, next) => {
    let newFileSchema = Joi.object({
      videoInput: Joi.string().min(4).required(),
      username: Joi.string().required(),
      viewFile: Joi.required().valid("image/jpeg", "image/png", "image/webp"),
    });


    console.log(newFileSchema.validate(req.body));

    next();
  },
};
