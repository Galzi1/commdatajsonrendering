import React, { useContext, useState } from 'react';

const CommDataLengthContext = React.createContext();
const SetCommDataLengthContext = React.createContext();

export const useCommDataLength = () => {
    return useContext(CommDataLengthContext);
};

export const useSetCommDataLength = () => {
    return useContext(SetCommDataLengthContext);
};

export const CommDataLengthProvider = ({ initialLength, children }) => {
    const [commDataLength, setCommDataLength] = (Object.is(initialLength, undefined) || Object.is(initialLength, null)) 
    ? useState(0) 
    : useState(initialLength);

    return (
        <CommDataLengthContext.Provider value={commDataLength}>
            <SetCommDataLengthContext.Provider value={setCommDataLength}>
                {children}
            </SetCommDataLengthContext.Provider>
        </CommDataLengthContext.Provider>
    );
};