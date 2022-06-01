import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

// screens
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

// components
import BottomIcon from './BottomIcon';
import Logo from '../components/Logo';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

    const bottoms = [
        { screen: 'Home', component: HomeScreen, iconRight: true, icon: 'home' },
        { screen: 'Favorites', component: FavoriteScreen, iconRight: true, icon: 'heart' },
    ]

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            {bottoms.map(({ screen, component, iconRight, icon }, index) => (
                <BottomTab.Screen
                    key={index}
                    name={screen}
                    component={component}
                    options={() => ({
                        title: '',
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

