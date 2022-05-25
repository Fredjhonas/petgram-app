import { API_BASE } from '@env';
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${API_BASE}/graphql`,
  cache: new InMemoryCache(),
});
