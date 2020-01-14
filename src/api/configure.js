import config from '../config/config';

const _API_BASE_URL = config.apiBaseURL[process.env.NODE_ENV];

export const API_BASE_URL = _API_BASE_URL;