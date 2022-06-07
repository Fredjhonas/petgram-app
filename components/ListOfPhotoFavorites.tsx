import { StyleSheet, FlatList, Platform } from 'react-native'
import { ActivityIndicator, Colors, Headline } from 'react-native-paper'
import { useGetFavsQuery } from '../types/graphql'


// components
import PhotoCard from './PhotoCard'

const ListOfPhotoFavorites = () => {
  const { data } = useGetFavsQuery()

  return (
    !data ? <ActivityIndicator animating={true} color={Colors.blue700} /> :
      <FlatList
        contentContainerStyle={Platform.OS === 'web' ? styles.listContent : { paddingBottom: 200 }}
        style={styles.container}
        data={data?.favs}
        ListHeaderComponent={() => <Headline style={styles.textHeader}>My favorites</Headline>}
        renderItem={({ item }) => <PhotoCard {...item} />}
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
