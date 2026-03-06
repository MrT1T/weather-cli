#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp,printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";
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

const saveCity = async (city) => {
    if (!city.length) {
        printError("City not provided");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("City saved successfully");
    } catch (e) {
        printError("Failed to save city", e.message);
    }
}

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case "01":
            return "☀️";
        case "02":
            return "⛅";
        case "03":
            return "☁️";
        case "04":
            return "☁️";
        case "09":
            return "🌧️";
        case "10":
            return "🌦️";
        case "11":
            return "🌩️";
        case "13":
            return "❄️";
        case "50":
            return "🌫️";
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const data = await getWeather(city);
        printWeather(data, getIcon(data.weather[0].icon));
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
      return printHelp();
    }
    if(args.s) {
     return saveCity(args.s);
    }

    if(args.t) {
     return saveToken(args.t);
    }

     await getForecast();
}

initCLI();