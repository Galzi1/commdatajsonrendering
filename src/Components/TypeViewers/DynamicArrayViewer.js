import React, {Fragment, useState, useEffect} from 'react';
import NullViewer from './NullViewer';
import ArrayViewer from './ArrayViewer';
import {convertString} from '../../Utils/GeneralUtils';
import {TextField, Box, Grid} from '@material-ui/core';
import LabelledOutline from '../General/LabelledOutline';
import DynamicArrayControls from './DynamicArrayControls';

export default function DynamicArrayViewer(props) {
    const field = props.field;
    const values = field.value;
    const lengthComponent = props.lengthComponent;
    const initialLength = props.initialLength;
    
    const [arrayLength, setArrayLength] = useState(0);

    useEffect(() => {
        if (!(Object.is(initialLength, undefined) || Object.is(initialLength, null))) {
            setArrayLength(initialLength);
        }
        else if (!(Object.is(values, undefined) || Object.is(values, null)) && Array.isArray(values)) {
            setArrayLength(values.length);
        };
    }, [values, lengthComponent]);

    const renderLengthComponent = () => {
        const childrenWithProps = React.Children.map(lengthComponent.props.children, child => {
            // checking isValidElement is the safe way and avoids a typescript error too
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {valueState: [arrayLength, setArrayLength]});
            }
            return child;
        });
    
        const comp = React.cloneElement(
            lengthComponent,
            {children: childrenWithProps}
        );
        return comp;
    };

    const addItemToArray = (event) => {
        console.log("ADD");
        setArrayLength(arrayLength + 1);
    };

    const removeItemFromArray = (event) => {
        console.log("REMOVE");
        setArrayLength(arrayLength - 1);
    };

    return (
        <Box id="array-viewer-div" p={1} border={1} borderColor="red">
            <LabelledOutline label="גודל המערך" button={<DynamicArrayControls plusHandler={addItemToArray} minusHandler={removeItemFromArray}/>}>
                {renderLengthComponent()}
            </LabelledOutline>
            <ArrayViewer {...props} valueState={[arrayLength, setArrayLength]} drawBorder={false}/>
        </Box>
            
    )
}
