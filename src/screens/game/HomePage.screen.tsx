import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';
import { Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { GameRouteNames } from '../../router/route-names';
import { useAuth } from '../../hooks/authContext';
import { GameStackParamList } from '../../router/navigationTypes';
import { joinGameById } from '../../api';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    background-color: #007BFF;
    align-items: center;
    margin: 10px;
    width: 200px;
`;

const ButtonText = styled.Text`
    color: #FFF;
`;

const Input = styled.TextInput`
    width: 100%;
    height: 40px;
    border: 1px solid #CCC;
    padding: 8px;
    margin-bottom: 10px;
`;

const HomePage: React.FC = () => {
    const navigation = useNavigation<NavigationProp<GameStackParamList>>();
    const { token } = useAuth();
    const [gameId, setGameId] = useState('');

    const handleUserDetailsPress = () => {
        navigation.navigate(GameRouteNames.USER_DETAILS);
    };

    const handleCreateGamePress = () => {
        navigation.navigate(GameRouteNames.CREATE_GAME);
    };

    const handleJoinGamePress = () => {
        navigation.navigate(GameRouteNames.JOIN_GAME);
    };

    const handleJoinGameByIdPress = async () => {
        try {
            await joinGameById(token, gameId);
            Alert.alert('Success', 'Joined game successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to join game');
            console.error(error);
        }
    };

    
    const handleConfigureTablePress = () => {
        navigation.navigate(GameRouteNames.CONFIGURE_TABLE); 
    };

    return (
        <Container>
            <Button onPress={handleUserDetailsPress}>
                <ButtonText>User Details</ButtonText>
            </Button>
            <Button onPress={handleCreateGamePress}>
                <ButtonText>Create Game</ButtonText>
            </Button>
            <Button onPress={handleJoinGamePress}>
                <ButtonText>Join Game</ButtonText>
            </Button>
            <Input
                placeholder="Enter Game ID"
                value={gameId}
                onChangeText={setGameId}
                keyboardType="numeric"
            />
            <Button onPress={handleJoinGameByIdPress}>
                <ButtonText>Join Game by ID</ButtonText>
            </Button>
            <Button onPress={handleConfigureTablePress}>
                <ButtonText>Configure Table</ButtonText>
            </Button>
        </Container>
    );
};

export default HomePage;
