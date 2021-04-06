import React from 'react';
import fieldViewerFactory from './FieldViewerFactory';

import {isPrimitive, getEnumIndex, getStructIndex} from '../../Utils/TypesUtils';

export default function FieldViewerWrapper(props) {
    const field = props.field;
    // "name": "Prim1", 
    // "type": "Int32", 
    // "isArray": false, 
    // "units": "", 
    // "range": "0-1000", 
    // "scale": "1", 
    // "description": "A Primitive Example", 
    // "value": 123
    const enums = props.enums;
    const structs = props.structs;
    const onFieldValueUpdated = props.onFieldValueUpdated;
    const arrayIndex = props.arrayIndex;
    const lengthComponent = props.lengthComponent;
    const initialLength = props.initialLength;

    const renderFieldViewer = (_field) => {
        if (Object.is(_field, undefined) || Object.is(_field, null)) {
            return fieldViewerFactory("null");
        }
        else if (_field.isArray) {
            return fieldViewerFactory("array", field, onFieldValueUpdated, undefined, enums, structs, arrayIndex, lengthComponent, initialLength);
        }
        else if (isPrimitive(_field.type)) {
            return fieldViewerFactory("primitive", field, onFieldValueUpdated, undefined, undefined, undefined, arrayIndex);
        }
        else {
            const enumIndex = getEnumIndex(enums, _field.type);
            if (enumIndex > -1) {
                const enumType = enums[enumIndex];
                return fieldViewerFactory("enum", field, onFieldValueUpdated, enumType, undefined, undefined, arrayIndex);
            }
            else {
                const structIndex = getStructIndex(structs, _field.type);
                if (structIndex > -1) {
                    const structType = structs[structIndex];
                    return fieldViewerFactory("struct", field, onFieldValueUpdated, structType, enums, structs, arrayIndex);
                }
                else {
                    return fieldViewerFactory("null");
                }
            }
        }
    };

    return (
        <div id='field-viewer-wrapper'>
            {renderFieldViewer(field)}
        </div>
    );
}