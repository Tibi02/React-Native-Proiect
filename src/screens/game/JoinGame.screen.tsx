import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useAuth } from '../../hooks/authContext';
import { fetchAllGames } from '../../api';

const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

const GameItem = styled.TouchableOpacity`
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f0f0f0;
`;

const GameText = styled.Text``;

const JoinGameScreen: React.FC = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError(null);
            try {
                const gamesData = await fetchAllGames(token);
                setGames(gamesData);
            } catch (error) {
                setError('Failed to fetch games');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, [token]);

    const handleJoinGame = (gameId: string) => {
        
    };

    const renderGameItem = ({ item }: { item: any }) => (
        <GameItem onPress={() => handleJoinGame(item.id)}>
            <GameText>Game ID: {item.id}</GameText>
            <GameText>Status: {item.status}</GameText>
        </GameItem>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#007BFF" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Container>
            <FlatList
                data={games}
                renderItem={renderGameItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>No games available</Text>}
            />
        </Container>
    );
};

export default JoinGameScreen;
