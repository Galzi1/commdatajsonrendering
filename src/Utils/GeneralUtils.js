export const isStringNumeric = (str) => {
    if (!(typeof str === 'string' || str instanceof String)) {
        return false // we only process strings!
    }
    
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
};

export const getIndexInCollection = (coll, targetField, targetValue) => {
    if (!(Object.is(coll, undefined) || Object.is(coll, null))
     && Array.isArray(coll) && (typeof targetField === 'string' || targetField instanceof String)) {
        for (let i = 0; i < coll.length; i++) {
            const element = coll[i];
            if (!(Object.is(element, undefined) || Object.is(element, null)) && element[targetField] === targetValue) {
                return i;
            }
        }
        return -1;
    }
};