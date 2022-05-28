import { StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { useGetPhotosQuery, useLikePhotoMutation } from '../types/graphql'

// components
import PhotoCard from './PhotoCard'

interface IListOfPhotoCardsProps {
  categoryId: string
}

const ListOfPhotoCards = ({ categoryId }: IListOfPhotoCardsProps) => {
  const { data, loading } = useGetPhotosQuery({ variables: { categoryId } })
  const likeMutation = useLikePhotoMutation()

  const handleLike = async (id: string) => {
    await likeMutation[0]({
      variables: {
        input: { id },
      }
    })
  }

  return (
    !data ? <ActivityIndicator animating={true} color={Colors.blue700} /> :
      <FlatList
        style={styles.container}
        data={data?.photos}
        renderItem={({ item }) => <PhotoCard {...item} handleLike={handleLike} />}
      />
  )
}

export default ListOfPhotoCards

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 200
  }
})
