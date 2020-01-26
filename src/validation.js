const normalizeErrors = errors => {
    const normilizedErrors = errors.map(error => {
        const { path, message } = error;

        return { message, path };
    });

    return {
        normilizedErrors,
        status: 'failed',
    };
};

export const validateSchema = schema => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false
    });

    if (error && error.isJoi) {
        res.status(400).json(normalizeErrors(error.details));
    } else {
        // eslint-disable-next-line
        next();
    }
};
