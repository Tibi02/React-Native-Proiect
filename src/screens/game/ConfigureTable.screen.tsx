import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, Alert } from 'react-native';
import ShipSelectionUI from './ShipSelectionUI';
import TableGrid from './TableGrid';
import { placeShipOnTable, validateShipPlacement } from './ShipPlacementLogic';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const ConfigureTableScreen: React.FC = () => {
    const [selectedShip, setSelectedShip] = useState<string>('');
    const [table, setTable] = useState<boolean[]>([false, false, false, false, false]);

    const handleSelectShip = (shipType: string) => {
        setSelectedShip(shipType);
    };

    const handlePlaceShip = (position: number, orientation: string) => {
        if (validateShipPlacement(selectedShip, position, orientation, table)) {
            const updatedTable = placeShipOnTable(selectedShip, position, orientation, table);
            setTable(updatedTable);
        } else {
            Alert.alert('Invalid Placement', 'The selected ship cannot be placed at the specified position.');
        }
    };

    return (
        <Container>
            <ShipSelectionUI onSelectShip={handleSelectShip} />
            <TableGrid table={table} onPlaceShip={handlePlaceShip} />
        </Container>
    );
};

export default ConfigureTableScreen;
