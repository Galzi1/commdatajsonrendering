import React from 'react';
import NullViewer from './NullViewer';
import PrimitiveViewer from './PrimitiveViewer';
import EnumViewer from './EnumViewer';
import ArrayViewer from './ArrayViewer';
import StructViewer from './StructViewer';
import DynamicArrayViewer from './DynamicArrayViewer';
import {isPrimitive, getEnumIndex, getStructIndex} from '../../Utils/TypesUtils';

export default function fieldViewerFactory(args) {
    const field = args.field;
    const onFieldValueUpdated = args.onFieldValueUpdated;
    const enums = args.enums;
    const structs = args.structs;
    const arrayIndex = args.arrayIndex;
    const lengthComponent = args.lengthComponent;
    const initialLength = args.initialLength;
    const valueState = args.valueState;

    if (Object.is(field, undefined) || Object.is(field, null)) {
        return (<NullViewer/>);
    }
    else if (field.isArray) {
        if (Object.is(lengthComponent, undefined) || Object.is(lengthComponent, null)) {
            return (<ArrayViewer field={field} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex}/>);
        }
        else {
            return (<DynamicArrayViewer field={field} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex} lengthComponent={lengthComponent} initialLength={initialLength}/>);
        }
    }
    else if (isPrimitive(field.type)) {
        return (<PrimitiveViewer field={field} onFieldValueUpdated={onFieldValueUpdated} arrayIndex={arrayIndex} valueState={valueState}/>);
    }
    else {
        const enumIndex = getEnumIndex(enums, field.type);
        if (enumIndex > -1) {
            const enumType = enums[enumIndex];
            return (<EnumViewer field={field} enumType={enumType} onFieldValueUpdated={onFieldValueUpdated} arrayIndex={arrayIndex}/>);
        }
        else {
            const structIndex = getStructIndex(structs, field.type);
            if (structIndex > -1) {
                const structType = structs[structIndex];
                return (<StructViewer field={field} structType={structType} onFieldValueUpdated={onFieldValueUpdated} enums={enums} structs={structs} arrayIndex={arrayIndex}/>);
            }
            else {
                return (<NullViewer/>);
            }
        }
    }
};
