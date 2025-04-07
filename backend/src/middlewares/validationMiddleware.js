import {
    createAndUpdateTravelPlanSchema,
    createJournalSchema,
    updateJournalSchema,
    updateUserSchema,
    updatePasswordSchema
  } from "./joiSchemas.js";
  
  const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      
      if (error) {
        return res.status(400).json({
          status: "error",
          message: "ข้อมูลไม่ถูกต้อง",
          errors: error.details.map(err => ({
            field: err.path[0],
            message: err.message
          }))
        });
      }
      next();
    };
  };
  
  export const validateCreateTravelPlan = validate(createAndUpdateTravelPlanSchema);
  export const validateCreateJournal = validate(createJournalSchema);
  export const validateUpdateJournal = validate(updateJournalSchema);
  export const validateUpdateUser = validate(updateUserSchema);
  export const validateUpdatePassword = validate(updatePasswordSchema);