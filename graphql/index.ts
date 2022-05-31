import { API_BASE } from '@env';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createHttpLink } from 'apollo-link-http';
import { setContext  } from 'apollo-link-context';


const getToken = async () => {
      const user = await AsyncStorage.getItem('user');
      const token = user ? JSON.parse(user).token : '';
      const authorization = token !== '' ? token : null;
      return authorization;
}
const httpLink = createHttpLink({
  uri:`${API_BASE}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from async storage if it exists
  const accessToken = await getToken();

  // return the headers to the context so httpLink can read them
  return {
      headers: {
          ...headers,
          authorization: accessToken !== null ? `Bearer ${accessToken}` : '',
      },
  };
});

const link = authLink.concat(httpLink)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
