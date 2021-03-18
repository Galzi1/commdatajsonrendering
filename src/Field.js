import React, { useEffect, useState } from 'react';
import {StyledTableCell, StyledTableRow} from './TableStyle';
import './App.css';

const boolToStr = (flag) => {
    return flag ? "כן" : "לא";
};

export default function Field(props) {
    const id = props.id;
    const name = props.name;
    const type = props.type;
    const isArray = props.isArray;
    const units = props.units;
    const range = props.range;
    const scale = props.scale;
    const description = props.description;
    const p_value = props.value;
    const enums = props.enums;
    const structs = props.structs;
    const onFieldUpdated = props.onFieldUpdated;

    const [fieldValue, setFieldValue] = useState("");
    
    useEffect(() => {
        if (p_value) {
            setFieldValue(p_value);
        }
    }, [p_value]);

    return (
        <StyledTableRow key={id}>
            <StyledTableCell align="center">{id}</StyledTableCell>
            <StyledTableCell align="center">{name}</StyledTableCell>
            <StyledTableCell align="center">{type}</StyledTableCell>
            <StyledTableCell align="center">{boolToStr(isArray)}</StyledTableCell>
            <StyledTableCell align="center">{units}</StyledTableCell>
            <StyledTableCell align="center">{range}</StyledTableCell>
            <StyledTableCell align="center">{scale}</StyledTableCell>
            <StyledTableCell align="center">{description}</StyledTableCell>
            <StyledTableCell align="center">
                <input value={fieldValue} 
                            onChange={
                                ({ target: { value } }) => {
                                    setFieldValue(value);
                                    onFieldUpdated(name);
                                }
                            } type="text" className="form-control form-control-sm" placeholder="תקציר התקלה"/>
            </StyledTableCell>
        </StyledTableRow>
    )
}

//id={index} name={name} type={type} isArray={isArray} units={units} range={range} scale={scale} description={description} value={value} enums={enums} structs={structs} onFieldUpdated={onFieldUpdated}