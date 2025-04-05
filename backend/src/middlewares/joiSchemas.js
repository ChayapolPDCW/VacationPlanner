import Joi from "joi";

// Travel Plan Schemas
export const createAndUpdateTravelPlanSchema = Joi.object({
  title: Joi.string().min(3).max(100).required()
    .messages({
      'string.min': 'ชื่อแผนการเดินทางต้องมีอย่างน้อย 3 ตัวอักษร',
      'string.max': 'ชื่อแผนการเดินทางต้องไม่เกิน 100 ตัวอักษร',
      'any.required': 'กรุณาระบุชื่อแผนการเดินทาง'
    }),
  startDate: Joi.date().greater('now').required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(), 
  visibility: Joi.string().valid('PUBLIC', 'PRIVATE').required(),
  itinerary: Joi.array().items(
    Joi.object({
      date: Joi.date().required(),
      places: Joi.array().items(
        Joi.object({
          title: Joi.string().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
          photoUrl: Joi.string().uri().allow(null),
          googlePlaceId: Joi.string().required()
        })
      )
    })
  )
});

// Journal Schemas
export const createJournalSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  notes: Joi.string().required(),
  mood: Joi.string().max(50).required(),
  rating: Joi.number().min(0).max(10).required()
});

export const updateJournalSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  notes: Joi.string(),
  mood: Joi.string().max(50),
  rating: Joi.number().min(0).max(10)
}).min(1);

// User Schemas
export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  avatarUrl: Joi.string().uri().allow(null)
}).min(1);

export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required()
});