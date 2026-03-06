

export const getArgs = () => {
    const args = process.argv.slice(2);
    const result = {};
    args.forEach((arg, index, arr) => {
        if (arg.startsWith('-')) {
            if (arr.length - 1 === index) {
                result[arg.substring(1)] = true;
            } else if (arr[index + 1] && !arr[index + 1].startsWith('-')) {
                result[arg.substring(1)] = arr[index + 1];
            } else {
                result[arg.substring(1)] = true;
            }
        }
    });
    return result;
}
