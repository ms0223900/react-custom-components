import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';

export const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
    'https://intense-brushlands-46000.herokuapp.com' : 
    process.env.STORYBOOK_API || 'http://localhost:1337/graphql' 

const link = createHttpLink({ uri: apiUrl, })
const cache = new InMemoryCache()
export const client = new ApolloClient({
  cache,
  link,
})

export const ApolloProviderWrapper = (props) => (
  <ApolloProvider client={ client }>
    {props.children}
  </ApolloProvider>
)

export const RouterWrapper = props => (
  <Router>
    {props.children}
  </Router>
)