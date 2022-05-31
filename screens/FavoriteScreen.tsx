import { StyleSheet, Text } from 'react-native';

import { View } from '../components/Themed';

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text>Favorites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
