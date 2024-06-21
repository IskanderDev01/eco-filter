export enum ValidateAddClientError {
    INCORRECT_USER_NAME_DATA = 'не указали имя',
    INCORRECT_USER_NAME = 'нельзя писать только цифры в имя',
    INCORRECT_ADDRESS_DATA = 'не указали адрес',
    INCORRECT_ADDRESS = 'нельзя писать только цифры в адрес',
    INCORRECT_PHONE_DATA = 'не указали телефон',
    INCORRECT_PHONE = 'в телефон нужно указать только цифры без пробела',
    INCORRECT_PHONE1 = 'превышен количество цифр на номере',
    INCORRECT_EXPIRATIOIN_DATE_1 = 'если фильтр 1 то нужно добавить только две количества месяца например: 2 4 или оставить пустым',
    INCORRECT_EXPERATION_DATE_3 = 'нельзя указывать в месяц фильтра буквы ',
    INCORRECT_EXPIRATIOIN_DATE_2 = 'если фильтр 2 то нужно добавить только одно количество месяца например: 2 или оставить пустым',
    NO_DATA = 'ничего не указали',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface ClientSchema {
    name: string,
    address: string;
    phone: string;
    category_id: number;
    expiration_date?: Array<string>;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateAddClientError[] | null;
    created_at?: string;
    first_date?: string;
    second_date?: string;
}
