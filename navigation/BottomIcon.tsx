import { Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/core';

interface IBottomIconProps {
    type: string;
    color: string;
    name?: string;
}

const BottomIcon = ({ type, color, name }: IBottomIconProps) => {
    const navigation = useNavigation();

    const RightIcon = (props: { colorScheme: string }) => {
        return (
            <Pressable
                onPress={() => navigation.navigate('Login')}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row'
                })}>
                <Text style={[styles.textTop, { color: Colors[props.colorScheme]?.text }]}>Ingresar</Text>
                <FontAwesome
                    name="sign-in"
                    size={30}
                    color={Colors[props.colorScheme]?.text}
                    style={{ marginRight: 15 }}
                />
            </Pressable>
        )
    }

    /**
     * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
     */
    const TabBarIcon = (props:
        {
            name: React.ComponentProps<typeof FontAwesome>['name'];
            color: string;
        }) => {
        return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
    }

    return type === 'topRight' ? <RightIcon colorScheme={color} /> : <TabBarIcon name={name} color={color} />
}

const styles = StyleSheet.create({
    textTop: {
        color: 'white',
        marginRight: 10,
        marginTop: 5,
    }
})

export default BottomIcon


