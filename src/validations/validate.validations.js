export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.reduce((acc, current) => {
                acc[current.path[0]] = current.message;
                return acc;
            }, {});

            return res.status(400).json({ message: "Error occurred.", error });
        }
        req.body = value;
        next();
    };
};  