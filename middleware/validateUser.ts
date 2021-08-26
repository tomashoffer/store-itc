const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);

export function validateUser(schema) {
  return (req, res, next) => {
    try{
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      console.log(ajv.errors);
      throw new Error(ajv.errors[0])
      }
    next()
    }catch(err){
      res.status(400).send(err)
    }
  };

};

