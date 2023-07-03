import { StyleSheet, Platform } from 'react-native';
import ListOfPhotoFavorites from '../components/ListOfPhotoFavorites';

import { View } from '../components/Themed';

export default function FavoriteScreen() {
  return (
    <View style={Platform.OS !== 'web' ? styles.container : styles.containerWeb}>
      <ListOfPhotoFavorites />
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
