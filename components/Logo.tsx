import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Image, View, Pressable } from 'react-native'
import LogoSvg from '../assets/images/pet-icon.svg';
import { Headline } from 'react-native-paper';

const Logo = () => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 10 }}>
            <Pressable onPress={() => navigation.navigate('Home')} style={styles.button}>
                <LogoSvg width={30} height={30} />
                <Headline style={{ fontSize: 24, color: '#2c2c2c' }}>
                    Petgram
                </Headline>
            </Pressable>
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 40,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})