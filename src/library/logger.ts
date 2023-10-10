import chalk from "chalk";

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(chalk.blue(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object));
    } else {
        console.info(chalk.blue(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`));
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object));
    } else {
        console.warn(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`));
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object));
    } else {
        console.error(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(chalk.cyan(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object));
    } else {
        console.debug(chalk.cyan(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`));
    }
};

const getTimeStamp = (): string => new Date().toISOString();
export default { info, warn, error, debug };
