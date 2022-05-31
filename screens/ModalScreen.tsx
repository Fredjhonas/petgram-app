import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet } from 'react-native';
import { useLoginMutation, useSignupMutation } from '../types/graphql';

// components
import FormLogin from '../components/FormLogin';
import { View } from '../components/Themed';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export default function ModalScreen() {
  const loginMutation = useLoginMutation()
  const signupMutation = useSignupMutation()
  const { setUser } = useContext(UserContext)

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
      Alert.alert('Success', 'You have successfully logged in')
    } catch (error) {
      Alert.alert('Error', 'Something went wrong')
    }
  }

  return (
    <View style={styles.container}>
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
  }
});
