import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const Cell = styled.TouchableOpacity<{ occupied: boolean }>`
    width: 30px;
    height: 30px;
    border: 1px solid #000;
    background-color: ${(props) => (props.occupied ? '#FF0000' : '#FFF')};
`;

interface TableGridProps {
    table: boolean[]; 
    onPlaceShip: (position: number, orientation: string) => void;
}

const TableGrid: React.FC<TableGridProps> = ({ table, onPlaceShip }) => {
    const handlePlaceShip = (position: number) => {
        if (!table[position]) {
            const orientation = 'horizontal'; 
            onPlaceShip(position, orientation);
        }
    };

    return (
        <Container>
            {table.map((cell, index) => (
                <Cell key={index} occupied={cell} onPress={() => handlePlaceShip(index)} />
            ))}
        </Container>
    );
};

export default TableGrid;
