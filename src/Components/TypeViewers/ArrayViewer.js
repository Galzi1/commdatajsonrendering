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

    const renderValues = (field) => {
        if (!(Object.is(innerFields, undefined) || Object.is(innerFields, null)) && Array.isArray(values)) {
            const ret = innerFields.map((innerField) => {
                return (<FieldViewerWrapper field={innerField} enums={enums} structs={structs} onFieldValueUpdated={onFieldValueUpdated}/>)
            });
            return ret;
        }

        return <NullViewer/>;
    };

    return (
        <div id="array-viewer-div">
            {renderValues(field)}
        </div>
    )
}
