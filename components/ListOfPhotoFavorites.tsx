import { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator, Colors, Headline } from 'react-native-paper'
import { useGetFavsQuery } from '../types/graphql'


// components
import PhotoCard from './PhotoCard'



const ListOfPhotoFavorites = () => {
  const { data } = useGetFavsQuery()
  const [favorites, setFavorites] = useState([])
  console.log('DATA', data)

  useEffect(() => {
    if (data?.favs) {
      setFavorites(data.favs)
    }
  }, [data])


  return (
    <FlatList
      style={styles.container}
      data={favorites}
      ListHeaderComponent={() => <Headline style={styles.textHeader}>My favorites</Headline>}
      renderItem={({ item }) => <PhotoCard {...item} />}
    />
  )
}

export default ListOfPhotoFavorites

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // marginBottom: 200
  },
  textHeader: {
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold'
  }
})
