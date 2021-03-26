import React, {useState, useEffect} from 'react';
import NullViewer from './NullViewer';
import FieldViewerWrapper from './FieldViewerWrapper';

export default function ArrayViewer(props) {
    const field = props.field;
    // "name": "EnumArray1", 
    // "type": "E_Mode", 
    // "isArray": true, 
    // "units": "", 
    // "range": "", 
    // "scale": "", 
    // "description": "An Enum Array Example", 
    // "value": [
    //     0, 2, 1
    // ]
    const onFieldValueUpdated = props.onFieldValueUpdated;
    const enums = props.enums;
    const structs = props.structs;
    const values = field.value;
    const arrayIndex = props.arrayIndex;
    
    const [innerFields, setInnerFields] = useState([]);

    useEffect(() => {
        setInnerFields(buildInnerFields(field, values));
    }, [field, values]);

    const buildInnerFields = (field, values) => {
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

    const onArrayValueUpdated = (fieldName, newValue, params = undefined) => {
        let index = -1;
        if (!(Object.is(params, undefined) || Object.is(params, null))) {
            index = params['index'];
        }

        if (index >= 0 && index < values.length) {
            values[index] = parseInt(newValue);
            //TODO: Adjust to length

            if (!(Object.is(onFieldValueUpdated, undefined) || Object.is(onFieldValueUpdated, null))) {
                onFieldValueUpdated(field.name, values, {"index": arrayIndex})
            }
        }
    };

    const renderValues = (_innerFields) => {
        if (!(Object.is(_innerFields, undefined) || Object.is(_innerFields, null)) && Array.isArray(values)) {
            const ret = _innerFields.map((innerField, index) => {
                const wrapper = (<FieldViewerWrapper field={innerField} enums={enums} structs={structs} onFieldValueUpdated={onArrayValueUpdated} arrayIndex={index}/>);
                return wrapper;
            });
            return ret;
        }

        return <NullViewer/>;
    };

    return (
        <div id="array-viewer-div">
            {renderValues(innerFields)}
        </div>
    )
}
