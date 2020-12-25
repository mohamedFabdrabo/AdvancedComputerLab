const Joi=require("joi");
const addCourseValidation=(data)=>{
const schema=Joi.object({

    depname:Joi.string().required(),
    nam:Joi.string().required(),
    id:Joi.string().required()
});

return schema.validate(data);
}
const addLocationValidation=(data)=>{
    const schema=Joi.object({
    
        nam:Joi.string().required(),
        cap:Joi.string().required(),
        typ:Joi.string().required(),
        occ:Joi.number().required(),
        
    });
    
    return schema.validate(data);
}

const deleteLocationValidation=(data)=>{
    const schema=Joi.object({
    
        nam:Joi.string().required(),
        
    });
    
    return schema.validate(data);
}

const af=(data)=>{
    const schema=Joi.object({
    
        nam:Joi.string().required(),
        department:Joi.array(),  
    });
    
    return schema.validate(data);
}

const af1=(data)=>{
    const schema=Joi.object({
        nam:Joi.string().required(),
        newname:Joi.string().required()   
    });
    
    return schema.validate(data);
}

const dp=(data)=>{
    const schema=Joi.object({
        facname:Joi.string().required() ,
        nam:Joi.string().required()
    });
    
    return schema.validate(data);
}
const dp1=(data)=>{
    const schema=Joi.object({
        oldnam:Joi.string().required() ,
        newnam:Joi.string().required()
    });
    
    return schema.validate(data);
}
const dp2=(data)=>{
    const schema=Joi.object({
        oldid:Joi.string().required() ,
        newid:Joi.string().required(),
        newname:Joi.string()
    });
    
    return schema.validate(data);
}
const dp3=(data)=>{
    const schema=Joi.object({
        id:Joi.string().required() 
    });
    
    return schema.validate(data);
}
const dp4=(data)=>{
    const schema=Joi.object({
        courses: Joi.array(),
        gender: Joi.string(),
        name: Joi.string().required(),
        email:Joi.string().email({ tlds: { allow: false } }),
        salary:Joi.number().required(),
        officeLocation:Joi.object().required(),
        role: Joi.string().required(),
        dayoff: Joi.string(),
        department:Joi.string()
    });
    
    return schema.validate(data);
}

const dp5=(data)=>{
    const schema=Joi.object({
        id:Joi.string().required(),       
        email:Joi.string().email({ tlds: { allow: false } }),
        officeLocation:Joi.string().required(),
        role: Joi.string().required(),
        dayoff: Joi.string(),
    });
    return schema.validate(data);
}



const dp6=(data)=>{
    const schema=Joi.object({
        id:Joi.string().required(),       
    });
    return schema.validate(data);
}

const dp7=(data)=>{
    const schema=Joi.object({
        staffid:Joi.string().required(),       
        rec:Joi.object().required(),
    });
    return schema.validate(data);
}


const dp8=(data)=>{
    const schema=Joi.object({
        staffid:Joi.string().required(),       
        rec:Joi.object().required(),
    });
    return schema.validate(data);
}
module.exports.addCourseValidation=addCourseValidation;
module.exports.addLocationValidation=addLocationValidation;
module.exports.deleteLocationValidation=deleteLocationValidation;
module.exports.af=af;
module.exports.af1=af1;
module.exports.dp=dp;
module.exports.dp1=dp1;
module.exports.dp2=dp2;
module.exports.dp3=dp3;
module.exports.dp4=dp4;
module.exports.dp5=dp5;
module.exports.dp6=dp6;
module.exports.dp7=dp7;
/*module.exports.dp8=dp7;
/*module.exports.dp9=dp7;
*/