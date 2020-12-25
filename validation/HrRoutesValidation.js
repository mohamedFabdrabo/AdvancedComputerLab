const Joi=require("joi");
const addCourseValidation=(data)=>{
const schema=Joi.object({

    depname:Joi.string().required(),
    nam:Joi.string().required(),
    id:Joi.string().required()
});

return schema.validate(data);
}
module.exports.addCourseValidation=addCourseValidation;