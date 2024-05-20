import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/game/HomePage.screen';
import { GameRouteNames } from './route-names';
import { Text } from 'react-native';
import TableScreen from '../screens/game/Table.screen';
import CreateGameScreen from '../screens/game/CreateGame.screen';
import JoinGameScreen from '../screens/game/JoinGame.screen';
import UserDetailsScreen from '../screens/game/UserDetails.screen';
import ConfigureTableScreen from '../screens/game/ConfigureTable.screen';
import { GameStackParamList } from './navigationTypes';

const GameStack = createNativeStackNavigator<GameStackParamList>();

const gameRoutes = (
    <GameStack.Navigator initialRouteName={GameRouteNames.HOME}>
        <GameStack.Screen name={GameRouteNames.HOME} component={HomePage} options={{
            headerTitle: (props) => <Text {...props}>Home</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.TABLE} component={TableScreen} options={{
            headerTitle: (props) => <Text {...props}>Game</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.CREATE_GAME} component={CreateGameScreen} options={{
            headerTitle: (props) => <Text {...props}>Create Game</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.JOIN_GAME} component={JoinGameScreen} options={{
            headerTitle: (props) => <Text {...props}>Join Game</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.USER_DETAILS} component={UserDetailsScreen} options={{
            headerTitle: (props) => <Text {...props}>User Details</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.CONFIGURE_TABLE} component={ConfigureTableScreen} options={{
            headerTitle: (props) => <Text {...props}>Configure Table</Text>
        }}/>
    </GameStack.Navigator>
);

export default gameRoutes;
