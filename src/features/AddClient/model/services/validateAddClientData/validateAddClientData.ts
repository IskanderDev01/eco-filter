import { ValidateAddClientError } from '../../types/CLientSchema'
import { Users } from '../../types/users'

function containsNoText(mass: any) {
    for (let i = 0; i < mass.length; i++) {
        if (typeof mass[i] === 'string' && /[a-zA-Z]/.test(mass[i])) {
            return false;
        }
    }
    return true;
}

export const validateAddClientData = (users?: Users): ValidateAddClientError[] => {
    
    if (!users) {
        return [ValidateAddClientError.NO_DATA];
    }
    const {
    name, address, phone, expiration_date
        } = users;
    const errors: ValidateAddClientError[] = [];
    function isValid(value:string) {
        return Boolean(value && value.trim());
    }
    if (!isValid(name)) {
        errors.push(ValidateAddClientError.INCORRECT_USER_NAME_DATA);
    } else if (typeof name !== 'string') {
        errors.push(ValidateAddClientError.INCORRECT_USER_NAME);
    }

    if (!isValid(address)) {
        errors.push(ValidateAddClientError.INCORRECT_ADDRESS_DATA);
    } else if (typeof address !== 'string') {
        errors.push(ValidateAddClientError.INCORRECT_ADDRESS);
    }

    if (!phone) {
        errors.push(ValidateAddClientError.INCORRECT_PHONE_DATA);
    } else if (!/^\d+$/.test(phone)) {
        errors.push(ValidateAddClientError.INCORRECT_PHONE)
    }
    if(!containsNoText(expiration_date)) {
        errors.push(ValidateAddClientError.INCORRECT_EXPERATION_DATE_3)
    }
    return errors;
};