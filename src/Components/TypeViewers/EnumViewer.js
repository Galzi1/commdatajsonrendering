import React, {useState} from 'react';

export default function EnumViewer(props) {
    const field = props.field;
    // "name": "Prim1", 
    // "type": "Int32", 
    // "isArray": false, 
    // "units": "", 
    // "range": "0-1000", 
    // "scale": "1", 
    // "description": "A Primitive Example", 
    // "value": 123
    const onFieldValueUpdated = props.onFieldValueUpdated;

    const [value, setValue] = useState(field.value);

    return (
        <div id="enum-viewer-div">
            {field.type}
        </div>
    )
}
