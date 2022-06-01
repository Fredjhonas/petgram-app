import { StyleSheet } from 'react-native';
import ListOfPhotoFavorites from '../components/ListOfPhotoFavorites';

import { View } from '../components/Themed';

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <ListOfPhotoFavorites />
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
