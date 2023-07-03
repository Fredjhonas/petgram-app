import { Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { useGetPhotosQuery } from '../types/graphql';
import { useFocusEffect } from '@react-navigation/native';
interface IBottomIconProps {
    type: string;
    color: string;
    name?: string;
}

const BottomIcon = ({ type, color, name }: IBottomIconProps) => {
    const navigation = useNavigation();
    const { refetch } = useGetPhotosQuery()
    const { getUser, isAuthenticated, removeUser, changeAuth } = useContext(UserContext);
    const [userEmail, setUserEmail] = useState('')

    const handleNavigate = () => {
        if (isAuthenticated) {
            refetch()
            removeUser()
        } else {
            navigation.navigate('Login')
        }
    }

    const getUserData = async () => {
        let user = await getUser()

        if (user !== null) {
            setUserEmail(user.email)
        } else {
            changeAuth(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getUserData()

            return () => {
                changeAuth(false)
            }
        }, [])
    )




    const RightIcon = (props: { colorScheme: string }) => {
        return (
            <Pressable
                onPress={() => handleNavigate()}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                })}>
                <Text style={[styles.textTop, { color: Colors[props.colorScheme]?.text }]}>{isAuthenticated ? `Hola ${userEmail}` : 'Ingresar'}</Text>
                <FontAwesome
                    name={isAuthenticated ? 'sign-out' : 'sign-in'}
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
        fontSize: 14
    }
})

export default BottomIcon


