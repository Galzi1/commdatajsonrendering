import React, { useEffect, useState} from 'react';
import CommDataJson from './CommDataJson';
import {StyledTableCell, TableWrapperStyle} from './TableStyle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';

export default function CommDataCollection() {
    const [commDataCollection, setCommDataCollection] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            getCommDataCollection();
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    const getCommDataCollection = (callback = null) => {
        var coll = [
            {
                id: "0x1234", 
                name: "Message1", 
                source: "System1", 
                destination: "System2", 
                length: 4, 
                enums: [], 
                structs: [], 
                fields: [
                    {
                        name: "Var1", 
                        type: "Int32", 
                        isArray: false, 
                        units: "", 
                        range: "0-1000", 
                        scale: "1", 
                        description: "", 
                        value: 123
                    }
                ]
            }
        ]
        setCommDataCollection(coll); //TODO insert actual valid values
    }

    function renderTableData() {
        return commDataCollection.map((commData, index) => {
            const { 
                id, 
                name, 
                source, 
                destination, 
                length, 
                enums, 
                structs, 
                fields
            } = commData //destructuring
            return (
                <CommDataJson id={index} name={name} source={source} destination={destination} length={length} enums={enums} structs={structs} fields={fields}/>
            )
        })
    }

    return (
        <div>
            <div>
                <h2 style={{fontWeight: "bold", textAlign: "center", marginTop: "1.1rem"}}>מידע שנשלח/התקבל</h2>
            </div>
            <TableContainer style={TableWrapperStyle}>
                <Table>
                    <TableHead className="bg-primary">
                        <TableRow>
                            <StyledTableCell align="center" scope="col">#</StyledTableCell>
                            <StyledTableCell align="center" scope="col">שם</StyledTableCell>
                            <StyledTableCell align="center" scope="col">מקור</StyledTableCell>
                            <StyledTableCell align="center" scope="col">יעד</StyledTableCell>
                            <StyledTableCell align="center" scope="col">אורך</StyledTableCell>
                            <StyledTableCell align="center" scope="col">שדות</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableData()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}