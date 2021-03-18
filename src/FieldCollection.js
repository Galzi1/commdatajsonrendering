import React from 'react';
import Field from './Field';
import {StyledTableCell, TableWrapperStyle} from './TableStyle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';

export default function FieldCollection(props) {
    const enums = props.enums;
    const structs = props.structs;
    const fields = props.fields;
    const setFields = props.setFields;
    const onFieldUpdated = props.onFieldUpdated;
    
    const renderFields = () => {
        return fields.map((field, index) => {
            const { 
                name, 
                type,
                isArray, 
                units, 
                range, 
                scale, 
                description, 
                value
            } = field //destructuring
            return (
                <Field id={index} name={name} type={type} isArray={isArray} units={units} range={range} scale={scale} description={description} value={value} enums={enums} structs={structs} onFieldUpdated={onFieldUpdated}/>
            )
        })
    };

    return (
        <div>
            <TableContainer style={TableWrapperStyle}>
                <Table>
                    <TableHead className="bg-primary">
                        <TableRow>
                            <StyledTableCell align="center" scope="col">#</StyledTableCell>
                            <StyledTableCell align="center" scope="col">שם</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סוג</StyledTableCell>
                            <StyledTableCell align="center" scope="col">האם מערך?</StyledTableCell>
                            <StyledTableCell align="center" scope="col">יחידות</StyledTableCell>
                            <StyledTableCell align="center" scope="col">טווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סקאלה</StyledTableCell>
                            <StyledTableCell align="center" scope="col">תיאור</StyledTableCell>
                            <StyledTableCell align="center" scope="col">ערך</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderFields()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    )
}