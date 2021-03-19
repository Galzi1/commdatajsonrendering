import React, {useState} from 'react';

export default function PrimitiveViewer(props) {
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
        <input id="primitive-viewer-input" value={value} 
            onChange={
                ({ target: { value } }) => {
                    setValue(value);
                    onFieldValueUpdated(field.name);
                }
            } type="text" className="form-control form-control-sm" placeholder=""/>
    );
}
