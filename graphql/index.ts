import { API_BASE } from '@env';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from 'apollo-link-http';
import { setContext  } from 'apollo-link-context';
import userHandler from '../utils/userHandler';


const httpLink = createHttpLink({
  uri:`${API_BASE}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from async storage if it exists
  let user = await userHandler.getUser();
  const accessToken = user !== null ? user.token : ''

  // return the headers to the context so httpLink can read them
  return {
      headers: {
          ...headers,
          authorization: accessToken !== '' ? `Bearer ${accessToken}` : '',
      },
  };
});

const link = authLink.concat(httpLink)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
