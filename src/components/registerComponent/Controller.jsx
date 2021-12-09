export const validateStepOne = (email, password, blog) => {
    let errors = [];

    if (!email || email.length === 0) {
        errors.push('Email is required');
    }
    if (!password || password.length <= 7) {
        errors.push('Password must contain at least 8 char');
    }
    if (!blog || blog.length === 0) {
        errors.push('Blog name is required');
    }

    return errors;
};

export const validateStepTwo = age => {
    let errors = [];

    if (age < 16 || age > 120) {
        errors.push('Age must be between 16-120');
    }

    return errors;
};
