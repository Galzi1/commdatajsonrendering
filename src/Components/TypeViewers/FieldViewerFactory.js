import React from 'react';
import NullViewer from './NullViewer';
import PrimitiveViewer from './PrimitiveViewer';
import EnumViewer from './EnumViewer';
import ArrayViewer from './ArrayViewer';
import StructViewer from './StructViewer';

export default function fieldViewerFactory(fieldType, field = undefined, 
    onFieldValueUpdated = undefined, referencedType = undefined, enums = undefined, structs = undefined, arrayIndex = undefined) {
    switch (fieldType) {
        case "primitive":
            return (<PrimitiveViewer field={field} onFieldValueUpdated={onFieldValueUpdated} arrayIndex={arrayIndex}/>);
        case "enum":
            const viewer = (<EnumViewer field={field} enumType={referencedType} onFieldValueUpdated={onFieldValueUpdated} arrayIndex={arrayIndex}/>);
            console.log(viewer);
            return viewer;
        case "array":
            return (<ArrayViewer field={field} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex}/>);
        case "struct":
            return (<StructViewer field={field} structType={referencedType} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex}/>);
        default:
            return (<NullViewer/>);
    }
};