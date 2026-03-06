import chalk from 'chalk';

export const printError = (error) => {
    console.log(`${chalk.bgRed.white(" ERROR ")} ${error}`);
}

export const printSuccess = (message) => {
    console.log(`${chalk.bgGreen.white(" SUCCESS ")} ${message}`);
}

export const printHelp = () => {
    console.log(`
    ${chalk.bgCyan(" HELP ")} 
    without parameters - weather in current city
    -s [CITY] to set city
    -h for help
    -t [API_KEY] to set token
    `);
}