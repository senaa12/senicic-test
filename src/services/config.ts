export const API_CONFIG = {
    KEY: process.env.API_KEY,
    API_SERVICE_URL: 'http://api.openweathermap.org',
    API_GEO: 'geo',
    API_GEO_VERSION: '1.0',
    API_DATA: 'data',
    API_DATA_VERSION: '2.5',
    DEFAULT_LIMIT: 3,
    API_KEY_QUERY_PARAM_KEY: 'appid',
    ROUTES: {
        SEARCH_CITIES: 'direct?q={q}&limit={limit}',
        WEATHER_DATA: 'weather?lat={lat}&lon={lon}'
    }
}