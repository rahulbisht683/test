import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/stacknavigation';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from '@apollo/client';
import {ThemeProvider} from './src/context/themecontext';
import {SelectedProfileProvider} from './src/context/selectedProfile';
import {setContext} from '@apollo/client/link/context';
import {Accesstoken, Endpoint} from './src/utils/config';

const httpLink = createHttpLink({
  uri: Endpoint,
});
// console.log('token', Accesstoken);

const authLink = setContext((_, {headers}) => {
  const token = Accesstoken;
  return {
    headers: {
      Authorization: token,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <SelectedProfileProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </SelectedProfileProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
