import { StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

// services
import CategoryService from '../services/CategoryService';

// components
import { View } from '../components/Themed';
import { ListOfCategories } from '../components/ListOfCategories';
import ListOfPhotoCards from '../components/ListOfPhotoCards';

export default function HomeScreen() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const route = useRoute()
  const categoryId = route.params?.categoryId || ''


  const getCategories = async () => {
    let data = await CategoryService.getCategories()
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getCategories()
  }, [])

  return (
    <View style={Platform.OS !== 'web' ? styles.container : styles.containerWeb}>
      <ListOfCategories categories={categories} loading={loading} />
      <ListOfPhotoCards categoryId={categoryId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containerWeb: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: window.innerWidth > 400 ? 500 : window.innerWidth,
    justifyContent: 'center',
  }
});
