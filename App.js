import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/stacknavigation';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import {ThemeProvider} from './src/context/themecontext';
import {SelectedProfileProvider} from './src/context/selectedProfile';

const client = new ApolloClient({
  uri: 'https://api.poc.graphql.dev.vnplatform.com/graphql',
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
