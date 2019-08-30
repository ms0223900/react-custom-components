import React from 'react'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';

const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
  'https://intense-brushlands-46000.herokuapp.com' : 
  process.env.STORYBOOK_API || 'http://localhost:1337/graphql' 

const link = createHttpLink({ uri: apiUrl, })
const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link,
})

export const ApolloProviderWrapper = (props) => (
  <ApolloProvider client={ client }>
    {props.children}
  </ApolloProvider>
)