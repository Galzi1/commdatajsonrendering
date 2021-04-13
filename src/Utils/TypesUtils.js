import {isStringNumeric, getIndexInCollection} from './GeneralUtils';
import {Map} from 'immutable';

export const integerTypes = ["byte", "sbyte", "int16", "uint16", "int32", "uint32", "int64", "uint64"];
export const floatTypes = ["float", "double"];
export const textTypes = ["char", "string"];

export const defaultValues = Map({
    byte: 0, 
    sbyte: 0, 
    int16: 0, 
    uint16: 0, 
    int32: 0, 
    uint32: 0, 
    int64: 0, 
    uint64: 0, 
    float: 0.0, 
    double: 0.0, 
    char: "", 
    string: ""
});

export const typesSizes = Map({
    byte: 1, 
    sbyte: 1, 
    int16: 2, 
    uint16: 2, 
    int32: 4, 
    uint32: 4, 
    int64: 8, 
    uint64: 8, 
    float: 4, 
    double: 8, 
    char: 1, 
    string: 0
});

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

export const buildFieldValues = (field, values) => {
    const { 
        name, 
        type,
        isArray, 
        units, 
        range, 
        scale, 
        description, 
        p_value
    } = field //destructuring
    const ret = values.map(v => ({ name: name, type: type, 
        isArray: false, units: units, range: range, scale: scale, 
        description: description + " item", value: v}));
    return ret;
};

export const createEmptyField = (templateField = undefined) => {
    if (!(Object.is(templateField, undefined) || Object.is(templateField, null))) {
        return ({
            name: templateField.name, 
            type: templateField.type,
            isArray: false, 
            units: templateField.units, 
            range: templateField.range, 
            scale: templateField.scale, 
            description: templateField.description + " item", 
            value: defaultValues.get(templateField.type.toLowerCase())
        });
    }
    else {
        return ({
            name: "", 
            type: "",
            isArray: false, 
            units: "", 
            range: "", 
            scale: "", 
            description: "", 
            value: undefined
        });
    }
};