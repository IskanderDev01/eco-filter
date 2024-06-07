import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
    baseURL: 'https://backecofiltr.facescan.uz/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY)}` || '',
    },
});
