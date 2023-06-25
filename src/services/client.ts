import { API_CONFIG } from "./config";
import { City, WeatherData } from "./models";

interface IOpenWeatherClient {
    /** convert city name to lat-lon => built-in geocoder has been deprecated */
    SeachCity(q: string, limit?: number): Promise<City[]>;

    /** get weather data for specific lat-lon */
    GetWeather(lat: string, lon: string): Promise<WeatherData>;
}

class OpenWeatherClient implements IOpenWeatherClient {
    private getBaseGeoUrl = () => `${API_CONFIG.API_SERVICE_URL}/${API_CONFIG.API_GEO}/${API_CONFIG.API_GEO_VERSION}`;
    private getBaseDataUrl = () => `${API_CONFIG.API_SERVICE_URL}/${API_CONFIG.API_DATA}/${API_CONFIG.API_DATA_VERSION}`;

    private appendApiAuth = (url: string) => `${url}&${API_CONFIG.API_KEY_QUERY_PARAM_KEY}=${API_CONFIG.KEY}`;

    async SeachCity(q: string, limit?: number): Promise<City[]> {
        const relativeUrl = `${API_CONFIG.ROUTES.SEARCH_CITIES.replace('{q}', q).replace('{limit}', limit ? limit.toString() : API_CONFIG.DEFAULT_LIMIT.toString())}`;
        const url = `${this.getBaseGeoUrl()}/${relativeUrl}`;

        const response = await fetch(this.appendApiAuth(url));

        const responseBody = await response.text();
        if (!response.ok) {
            return Promise.reject(responseBody);
        }

        return JSON.parse(responseBody);
    }

    async GetWeather(lat: string, lon: string): Promise<WeatherData> {
        const relativeUrl = `${API_CONFIG.ROUTES.WEATHER_DATA.replace('{lat}', lat).replace('{lon}', lon)}`;
        const url = `${this.getBaseDataUrl()}/${relativeUrl}`;

        const response = await fetch(this.appendApiAuth(url));
        
        const responseBody = await response.text();
        if (!response.ok) {
            return Promise.reject(responseBody);
        }

        return JSON.parse(responseBody);
    }
}

export default new OpenWeatherClient();