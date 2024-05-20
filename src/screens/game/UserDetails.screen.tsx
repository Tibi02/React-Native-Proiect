import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/authContext';
import { fetchUserDetails } from '../../api';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const DetailsContainer = styled.View`
    margin: 10px;
`;

const UserDetailsScreen: React.FC = () => {
    const { token } = useAuth();
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const details = await fetchUserDetails(token);
                setUserDetails(details);
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();
    }, [token]);

    if (loading) {
        return (
            <Container>
                <ActivityIndicator size="large" color="#007BFF" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Text>{error}</Text>
            </Container>
        );
    }

    return (
        <Container>
            {userDetails ? (
                <DetailsContainer>
                    <Text>Email: {userDetails.user.email}</Text>
                    <Text>Games Played: {userDetails.gamesPlayed}</Text>
                    <Text>Games Won: {userDetails.gamesWon}</Text>
                    <Text>Games Lost: {userDetails.gamesLost}</Text>
                    <Text>Currently Playing: {userDetails.currentlyGamesPlaying}</Text>
                </DetailsContainer>
            ) : (
                <Text>No user details available</Text>
            )}
        </Container>
    );
};

export default UserDetailsScreen;
