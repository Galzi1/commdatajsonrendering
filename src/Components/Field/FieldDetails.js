import React, {useState} from 'react';
import KeyValueTableRow from '../General/KeyValueTableRow';
import { Popper, Paper, TableContainer, Table, TableBody, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const boolToStr = (flag) => {
    return flag ? "כן" : "לא";
};

export default function FieldDetails(props) {
    const field = props.field;
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [zIndex, setZIndex] = useState(-1000);

    const handleClick = (event) => {
        setZIndex(anchorEl ? -1000 : 1000);
        setAnchorEl(anchorEl ? null : event.currentTarget);
        
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} onClick={handleClick} style={{maxHeight: 20, maxWidth: 20}}>
                <FontAwesomeIcon icon={faInfoCircle}/>
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} style={{zIndex: zIndex}}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableBody>
                            <KeyValueTableRow title={"שם"} value={name}/>
                            <KeyValueTableRow title={"סוג"} value={type}/>
                            <KeyValueTableRow title={"?האם מערך"} value={boolToStr(isArray)}/>
                            <KeyValueTableRow title={"יחידות"} value={units}/>
                            <KeyValueTableRow title={"טווח"} value={range}/>
                            <KeyValueTableRow title={"סקאלה"} value={scale}/>
                            <KeyValueTableRow title={"תיאור"} value={description}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popper>
        </div>
    );
}