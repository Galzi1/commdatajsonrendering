import React from 'react';
import NullViewer from './NullViewer';
import PrimitiveViewer from './PrimitiveViewer';
import EnumViewer from './EnumViewer';
import ArrayViewer from './ArrayViewer';
import StructViewer from './StructViewer';
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

    const renderFieldViewer = (_field) => {
        if (Object.is(_field, undefined) || Object.is(_field, null)) {
            return (<NullViewer/>);
        }
        else if (_field.isArray) {
            return (<ArrayViewer field={field}/>);
        }
        else if (isPrimitive(_field.type)) {
            return (<PrimitiveViewer field={field}/>)
        }
        else {
            const enumIndex = getEnumIndex(enums, _field.type);
            if (enumIndex > -1) {
                const enumType = enums[enumIndex];
                return (<EnumViewer field={field} enumType={enumType}/>);
            }
            else {
                const structIndex = getStructIndex(structs, _field.type);
                if (structIndex > -1) {
                    const structType = structs[structIndex];
                    return (<StructViewer field={field} structType={structType}/>);
                }
                else {
                    return (<NullViewer/>);
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