import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

export const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if(!token) {
        throw new Error("Token not found, please set it using -t [API_KEY]");
    }

    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("q", city);
    url.searchParams.append("appid", token);
    url.searchParams.append("units", "metric");
    return await new Promise((resolve, reject) => {
        const req =  https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                const parsed = JSON.parse(data);
                if (res.statusCode !== 200) {
                  reject(parsed);
                } else {
                 resolve(parsed);
                }
            });
    });
    });
};