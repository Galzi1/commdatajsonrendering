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

const getIndexInCollection = (coll, target) => {
    if (!(Object.is(coll, undefined) || Object.is(coll, null)) && Array.isArray(coll)) {
        for (let i = 0; i < coll.length; i++) {
            const element = coll[i];
            if (!(Object.is(element, undefined) || Object.is(element, null)) && element.name === target) {
                return i;
            }
        }
        return -1;
    }
};

export const getEnumIndex = (enums, type) => {
    return getIndexInCollection(enums, type);
};

export const getStructIndex = (structs, type) => {
    return getIndexInCollection(structs, type);
};