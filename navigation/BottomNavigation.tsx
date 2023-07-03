import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

// screens
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ModalScreen from '../screens/ModalScreen';

// components
import BottomIcon from './BottomIcon';
import Logo from '../components/Logo';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { Platform } from 'react-native';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();
    const { isAuthenticated } = useContext(UserContext);

    const bottoms = [
        { screen: 'Home', component: HomeScreen, iconRight: true, icon: 'home' },
        { screen: 'Favorites', component: isAuthenticated ? FavoriteScreen : ModalScreen, iconRight: true, icon: 'heart' },
    ]

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerStyle: {
                    backgroundColor: '#FFC900',
                },
            }}>
            {bottoms.map(({ screen, component, iconRight, icon }, index) => (
                <BottomTab.Screen
                    key={index}
                    name={screen}
                    component={component}
                    options={() => ({
                        title: '',
                        tabBarStyle: Platform.OS === 'web' ? {
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: window.innerWidth > 400 ? 500 : window.innerWidth,
                            justifyContent: 'center',
                        } : {
                            backgroundColor: '#FFC900',
                        },
                        tabBarInactiveTintColor: '#2c2c2c',
                        tabBarIcon: ({ color }) => <BottomIcon type={'bottom'} name={icon} color={color} />,
                        headerLeft: () => <Logo />,
                        headerRight: () => iconRight &&
                            <BottomIcon type={'topRight'} color={colorScheme} />,
                    })}
                />
            ))}
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigator;

