import React from 'react';
import NullViewer from './NullViewer';
import PrimitiveViewer from './PrimitiveViewer';
import EnumViewer from './EnumViewer';
import ArrayViewer from './ArrayViewer';
import StructViewer from './StructViewer';
import DynamicArrayViewer from './DynamicArrayViewer';

export default function fieldViewerFactory(fieldType, field = undefined, onFieldValueUpdated = undefined, 
    referencedType = undefined, enums = undefined, structs = undefined, arrayIndex = undefined, lengthComponent = undefined, 
    initialLength = undefined) {
    switch (fieldType) {
        case "primitive":
            return (<PrimitiveViewer field={field} onFieldValueUpdated={onFieldValueUpdated} arrayIndex={arrayIndex}/>);
        case "enum":
            const viewer = (<EnumViewer field={field} enumType={referencedType} onFieldValueUpdated={onFieldValueUpdated} arrayIndex={arrayIndex}/>);
            return viewer;
        case "array": 
            if (Object.is(lengthComponent, undefined) || Object.is(lengthComponent, null)) {
                return (<ArrayViewer field={field} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex}/>);
            }
            else {
                return (<DynamicArrayViewer field={field} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex} lengthComponent={lengthComponent} initialLength={initialLength}/>);
            }
        case "struct":
            return (<StructViewer field={field} structType={referencedType} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex}/>);
        default:
            return (<NullViewer/>);
    }
};