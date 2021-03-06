import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet } from 'react-native';
import { useLoginMutation, useSignupMutation } from '../types/graphql';

// components
import FormLogin from '../components/FormLogin';
import { View } from '../components/Themed';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/core';

export default function ModalScreen() {
  const loginMutation = useLoginMutation()
  const signupMutation = useSignupMutation()
  const { setUser } = useContext(UserContext)
  const navigation = useNavigation()

  const handleSubmit = async (isLogin: boolean, values: { email: string, password: string }) => {
    const { email, password } = values
    const mutation = isLogin ? loginMutation : signupMutation
    try {
      const response = await mutation[0]({
        variables: {
          input: {
            email,
            password
          }
        }
      })
      let userToken = isLogin ? response?.data?.login : response?.data?.signup
      setUser({ email, token: userToken })
      let message = 'You have successfully logged in'
      Platform.OS === 'web' ? window.alert(message) : Alert.alert('Success', message)
      setTimeout(() => {
        navigation.navigate('Home')
      }, 4000);
    } catch (error) {
      let message = 'Something went wrong'
      Platform.OS === 'web' ? window.alert(message) : Alert.alert('Error', message)
    }
  }

  return (
    <View style={Platform.OS !== 'web' ? styles.container : styles.containerWeb}>
      <FormLogin onSubmit={handleSubmit} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'center',
    flex: 1,
  },
  containerWeb: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: window.innerWidth > 400 ? 500 : window.innerWidth,
    justifyContent: 'center',
  }
});
