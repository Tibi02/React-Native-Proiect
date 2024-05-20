import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, ActivityIndicator, View, Clipboard, Alert } from 'react-native';
import { useAuth } from '../../hooks/authContext';
import { createGame } from '../../api';

const Container = styled.View`
    flex: 1;
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

const MessageText = styled.Text`
    color: #000;
    margin-top: 20px;
`;

const GameDetailsContainer = styled.View`
    margin-top: 20px;
`;

const CreateGameScreen: React.FC = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [createdGame, setCreatedGame] = useState<any>(null);

    const handleCreateGamePress = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const result = await createGame(token);
            setCreatedGame(result);
            setMessage('Game created successfully!');
            console.log('Game created: ', result);
        } catch (error) {
            setMessage('Failed to create game');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyGameIdToClipboard = () => {
        if (createdGame) {
            Clipboard.setString(createdGame.id);
            Alert.alert('Success', 'Game ID copied to clipboard');
        }
    };

    return (
        <Container>
            <Button onPress={handleCreateGamePress}>
                <ButtonText>Create Game</ButtonText>
            </Button>
            {loading && <ActivityIndicator size="large" color="#007BFF" />}
            {message && <MessageText>{message}</MessageText>}
            {createdGame && (
                <GameDetailsContainer>
                    <Text>Game ID: {createdGame.id}</Text>
                    <Text>Status: {createdGame.status}</Text>
                    <Button onPress={copyGameIdToClipboard}>
                        <ButtonText>Copy Game ID</ButtonText>
                    </Button>
                </GameDetailsContainer>
            )}
        </Container>
    );
};

export default CreateGameScreen;
