import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import { View } from '../components/Themed';
import CategoryService from '../services/CategoryService';
import { ListOfCategories } from '../components/ListOfCategories';

export default function HomeScreen() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

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
    <View style={styles.container}>
      <ListOfCategories categories={categories} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
