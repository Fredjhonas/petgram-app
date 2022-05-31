import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from "@apollo/client";
import { client } from './graphql'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UserProvider } from './Context/UserContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <UserProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </UserProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
