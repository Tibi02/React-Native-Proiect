import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthRouteNames } from '../../router/route-names';
import { AuthStackParamList } from '../../router/navigationTypes';

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
    width: 100px;
`;

const ButtonText = styled.Text`
    color: #FFF;
`;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    const handleLoginPress = () => {
        navigation.navigate(AuthRouteNames.LOGIN);
    };

    const handleRegisterPress = () => {
        navigation.navigate(AuthRouteNames.REGISTER);
    };

    return (
        <Container>
            <Text>To play you need to connect or register</Text>
            <Button onPress={handleLoginPress}>
                <ButtonText>Login</ButtonText>
            </Button>
            <Button onPress={handleRegisterPress}>
                <ButtonText>Register</ButtonText>
            </Button>
        </Container>
    );
};

export default HomeScreen;
