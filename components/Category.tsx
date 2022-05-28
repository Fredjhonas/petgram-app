import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Avatar } from 'react-native-paper';


const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg';

interface ICategoryProps {
    id: string;
    cover: string;
    emoji: string;
}

const Category = ({ cover = DEFAULT_IMAGE, emoji = '?', id }: ICategoryProps) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Home', { categoryId: id })} style={styles.container}>
            <Avatar.Image size={76} source={{ uri: cover }} style={styles.image} />
            <Text style={styles.text}>{emoji}</Text>
        </TouchableOpacity>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    image: {
        borderColor: 'blue',
        borderWidth: 2,
    },
    text: {
        marginTop: 10,
    }
})