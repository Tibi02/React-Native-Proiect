import React, { useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
`;

const ShipButton = styled.TouchableOpacity<{ selected: boolean }>`
    padding: 10px;
    background-color: ${(props) => (props.selected ? '#FFD700' : '#007BFF')};
    border-radius: 5px;
`;

const ShipButtonText = styled.Text<{ selected: boolean }>`
    color: ${(props) => (props.selected ? '#000' : '#FFF')};
    font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`;

interface ShipSelectionUIProps {
    onSelectShip: (shipType: string) => void;
}

const ShipSelectionUI: React.FC<ShipSelectionUIProps> = ({ onSelectShip }) => {
    const [selectedShip, setSelectedShip] = useState('');

    const shipTypes = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];

    const handleSelectShip = (shipType: string) => {
        setSelectedShip(shipType);
        onSelectShip(shipType);
    };

    return (
        <Container>
            {shipTypes.map((shipType, index) => (
                <ShipButton
                    key={index}
                    onPress={() => handleSelectShip(shipType)}
                    selected={selectedShip === shipType}
                >
                    <ShipButtonText selected={selectedShip === shipType}>{shipType}</ShipButtonText>
                </ShipButton>
            ))}
        </Container>
    );
};

export default ShipSelectionUI;
