# History Weather CLI

A simple Node.js command-line tool that shows the current weather for a saved city using the OpenWeatherMap API.

## Features

- Get current weather for your default city
- Save your OpenWeatherMap API key
- Save your default city
- Display temperature, feels-like temperature, humidity, and wind speed
- Colored terminal output

## Requirements

- Node.js 18+ (recommended)
- npm
- OpenWeatherMap API key: https://openweathermap.org/api

## Installation

Install dependencies locally:

```bash
npm install
```

Optional: install globally from npm after publishing:

```bash
npm install -g history-weather-cli
```

## Usage

Run from project folder:

```bash
npm start
```

If installed globally:

```bash
weather
```

## CLI Options

- `-h` show help
- `-t <API_KEY>` save OpenWeatherMap API key
- `-s <CITY>` save default city

## Examples

```bash
weather -t your_openweather_api_key
weather -s London
weather
```

## How It Works

1. Save your API key with `-t`.
2. Save your city with `-s`.
3. Run `weather` without arguments to get current weather for the saved city.

## Configuration Storage

The app stores your data in a JSON file in your home directory:

- `~/weather-data.json`

On Windows, this is usually:

- `C:/Users/<YourUser>/weather-data.json`

Stored keys:

- `token` (OpenWeatherMap API key)
- `city` (default city)


## License

ISC
