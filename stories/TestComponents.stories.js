import React from 'react'
import { storiesOf } from '@storybook/react'
import TestComponent from '../src/components/testingComponents/testContextMiddleware'
import { ApolloProviderWrapper } from './API'
import TestPage from '../src/components/Pages'

// storiesOf('test components', module)
//   .add('test upload images to strapi', () => (
//     <UploadField />
//   ))
//   .add('test context middleware', () => (
//     <ApolloProviderWrapper>
//       <TestComponent />
//     </ApolloProviderWrapper>
//   ))
//   .add('test page component', () => (
//     <TestPage />
//   ))