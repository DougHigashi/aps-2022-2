import React from 'react'
import { createContext, useContext, useState } from "react";


const CoordinateContext = createContext();


export default function CoordinateProvider({ children }) {
    const [coordinate, setCoordinate] = useState({
        latitude: 37.78825,
        longitude: -122.4324
    });

    return <CoordinateContext.Provider value={{
        coordinate,
        setCoordinate
    }}>
        {children}
    </CoordinateContext.Provider>
}

export function useCoord() {
    const context = useContext(CoordinateContext);
    const { coordinate, setCoordinate } = context;
    return { coordinate, setCoordinate };

}