import Joi from "joi";

// register schema
export const registerSchema = Joi.object({
    companyId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'any.required': 'Company ID is required'
        }),

    firstName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            'any.required': 'First name is required',
            'string.min': 'First name must be at least 2 characters'
        }),

    lastName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            'any.required': 'Last name is required',
            'string.min': 'Last name must be at least 2 characters'
        }),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Enter a valid email address'
        }),

    password: Joi.string()
        .min(8)
        .max(100)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.pattern.base':
                'Password must contain at least one uppercase letter, one lowercase letter and one number'
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm password is required'
        }),

    employeeId: Joi.string()
        .trim()
        .max(50)
        .allow('', null),

    departmentId: Joi.number()
        .integer()
        .positive()
        .allow(null),

    primaryTeamId: Joi.number()
        .integer()
        .positive()
        .allow(null),

    managerId: Joi.number()
        .integer()
        .positive()
        .allow(null),

    phone: Joi.string()
        .trim()
        .max(20)
        .allow('', null),

    jobTitle: Joi.string()
        .trim()
        .max(100)
        .allow('', null),

    hireDate: Joi.date()
        .iso()
        .allow(null)
})
    .options({
        abortEarly: false,
        stripUnknown: true
    });
// Login schema
export const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Enter a valid email address'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});