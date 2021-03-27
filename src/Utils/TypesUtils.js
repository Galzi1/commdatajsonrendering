import {isStringNumeric, getIndexInCollection} from './GeneralUtils';

export const integerTypes = ["byte", "sbyte", "int16", "uint16", "int32", "uint32", "int64", "uint64"];
export const floatTypes = ["float", "double"];
export const textTypes = ["char", "string"];

export const isInteger = (type) => {
    const lowerCasedType = type.toLowerCase();
    return integerTypes.includes(lowerCasedType);
};

export const isFloat = (type) => {
    const lowerCasedType = type.toLowerCase();
    return floatTypes.includes(lowerCasedType);
};

export const isNumber = (type) => {
    return isInteger(type) || isFloat(type);
};

export const isText = (type) => {
    const lowerCasedType = type.toLowerCase();
    return textTypes.includes(lowerCasedType);
};

export const isPrimitive = (type) => {
    return isNumber(type) || isText(type);
};

export const convertString = (str, type) => {
    if (typeof str === 'string' || str instanceof String) {
        if (isNumber(type) && isStringNumeric(str)) {
            if (isInteger(type)) {
                return parseInt(str);
            }
            else if (isFloat(type)) {
                return parseFloat(str);
            }
            else {
                return str;
            }
        }
        else {
            return str;
        }
    }
    else {
        return str;
    }
};

export const getEnumIndex = (enums, type) => {
    return getIndexInCollection(enums, 'name', type);
};

export const getStructIndex = (structs, type) => {
    return getIndexInCollection(structs, 'name', type);
};