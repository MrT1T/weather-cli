#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp,printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token not provided");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Token saved successfully");
    } catch (e) {
        printError("Failed to save token", e.message);
    }
}

const getForecast = async (city) => {
    try {
        const data = await getWeather(city);
        printSuccess(`Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`);
    } catch (e) {
        console.log(e);
        if (e?.cod == 404) {
            printError("City not found");
        } else if (e?.cod == 401) {
            printError("Invalid token");
        } else {
            printError("Failed to get weather", e.message);
        }
    }
}

const initCLI = async () => {
    const args = getArgs();

    if (args.h) {
        printHelp();
    }
    if(args.s) {
     await getForecast("Brest");
    }

    if(args.t) {
     return saveToken(args.t);
    }
     await getForecast("Brest");
}

initCLI();