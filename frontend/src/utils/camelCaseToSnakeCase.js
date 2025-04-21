// create a function to convert `object from  camel case to snake case

export const convertCamelCaseToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, (match) => {
        return `_${match.toLowerCase()}`;
    });
}

export const convertObjectToSnakeCase = (obj) => {
    const newObj = {};
    for (const key in obj) {
        newObj[convertCamelCaseToSnakeCase(key)] = obj[key];
    }
    return newObj;
}