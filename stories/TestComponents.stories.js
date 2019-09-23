import React from 'react'
import { storiesOf } from '@storybook/react'
import UploadField from '../src/components/testingComponents/testStrapiUpload'
import TestComponent from '../src/components/testingComponents/testContextMiddleware'
import { ApolloProviderWrapper } from './API'

storiesOf('test components', module)
  .add('test upload images to strapi', () => (
    <UploadField />
  ))
  .add('test context middleware', () => (
    <ApolloProviderWrapper>
      <TestComponent />
    </ApolloProviderWrapper>
  ))