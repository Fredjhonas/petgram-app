import { StyleSheet, FlatList, Platform, Alert } from 'react-native'
import { ActivityIndicator, Colors, Headline } from 'react-native-paper'
import { useGetFavsQuery, useLikePhotoMutation } from '../types/graphql'


// components
import PhotoCard from './PhotoCard'

const ListOfPhotoFavorites = () => {
  const { data, refetch } = useGetFavsQuery()
  const likeMutation = useLikePhotoMutation()

  const handleLike = async (id: string) => {
    try {
      const response = await likeMutation[0]({
        variables: {
          input: { id },
        }
      })
      refetch()
      console.log('Success like: ', response)
    } catch (error) {
      let message = ''
      message = 'Something went wrong'
      Platform.OS === 'web' ? window.alert(message) :
        Alert.alert('Error', message)
    }
  }

  return (
    <FlatList
      contentContainerStyle={Platform.OS === 'web' ? styles.listContent : { paddingBottom: 200 }}
      style={styles.container}
      data={data?.favs}
      ListHeaderComponent={!data ? <ActivityIndicator animating={true} color={Colors.blue700} /> : <Headline style={styles.textHeader}>My favorites</Headline>}
      renderItem={({ item }) => <PhotoCard {...item} handleLike={handleLike} />}
    />
  )
}

export default ListOfPhotoFavorites

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textHeader: {
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  listContent: {
    height: window.innerHeight - 200
  }
})
