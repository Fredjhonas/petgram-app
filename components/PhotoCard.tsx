import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';

interface IPhotoCardProps {
    src: string;
    categoryId: number;
    id: string;
    likes: number;
    liked: boolean;
    handleLike: (id: string) => void;
}

const PhotoCard = ({ src = DEFAULT_IMAGE, id, categoryId, liked, likes, handleLike = () => { } }: IPhotoCardProps) => {
    const navigation = useNavigation();
    return (
        <Card style={styles.container} onPress={() => navigation.navigate('Home', { categoryId })}>
            <Card.Cover style={styles.cover} source={{ uri: src }} />
            <Card.Actions style={styles.actions}>
                <Button
                    compact
                    icon={liked ? 'heart' : 'heart-outline'}
                    labelStyle={[styles.button, { color: liked ? 'red' : 'black' }]}
                    onPress={() => handleLike(id)}>
                </Button>
                <Text style={styles.text}>{likes}</Text>
            </Card.Actions>
        </Card>
    )
}

export default PhotoCard

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    cover: {
        height: 300,
    },
    button: {
        fontSize: 35,
    },
    actions: {
        padding: 5
    },
    text: {
        fontSize: 20,
    }
})