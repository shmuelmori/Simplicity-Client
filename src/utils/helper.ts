import validator from 'validator';

export const validFirstName = (firstName: string): boolean => {
    return firstName.length > 1;
}

export const validLastName = (lastName: string): boolean => {
    return lastName.length > 1;
}

export const validPassword = (password: string): boolean => {
    if (password.length < 8) return false;

    const letterOnlyRegex = /^[A-Za-z]+$/;
    // text method check if password contain only from letterOnlyRegex - English letters
    return letterOnlyRegex.test(password);
}

export const validPhone = (phone: string): boolean => {
   return validator.isMobilePhone(phone, 'any');
}

export const validGroupName = (name: string): boolean => {
    return name.length > 2;
}

export const validDescription = (description: string): boolean => {
    return description.length > 5;
}