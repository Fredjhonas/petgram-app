import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Image, View, Pressable } from 'react-native'

const Logo = () => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 10 }}>
            <Pressable onPress={() => navigation.navigate('Home')} >
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
            </Pressable>
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 40,
    }
})