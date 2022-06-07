import { StyleSheet, FlatList, Alert, Platform } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { useGetFavsQuery, useGetPhotosQuery, useLikePhotoMutation } from '../types/graphql'

// components
import PhotoCard from './PhotoCard'

interface IListOfPhotoCardsProps {
  categoryId: string
}

const ListOfPhotoCards = ({ categoryId }: IListOfPhotoCardsProps) => {
  const { data } = useGetPhotosQuery({ variables: { categoryId } })
  const { refetch } = useGetFavsQuery()
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
      let message = 'Something went wrong'
      Platform.OS === 'web' ? window.alert(message) :
        Alert.alert('Error', message)
    }
  }

  return (
    <FlatList
      contentContainerStyle={Platform.OS === 'web' ? styles.listContent : { paddingBottom: 200 }}
      ListHeaderComponent={!data && <ActivityIndicator animating={true} color={Colors.blue700} />}
      data={data?.photos}
      renderItem={({ item }) => <PhotoCard {...item} handleLike={handleLike} />}
    />
  )
}

export default ListOfPhotoCards

const styles = StyleSheet.create({
  listContent: {
    height: window.innerHeight - 300
  }
})
