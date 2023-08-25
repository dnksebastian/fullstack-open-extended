export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
};

export const parseString = (arg: unknown, argName: string): string => {
    if(!arg || !isString(arg)) {
        throw new Error(`Invalid or missing ${argName}: ${arg}`);
    }

    return arg;
};

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown, argName: string): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or mising ${argName}: ${date}`);
    }
    return date;
};