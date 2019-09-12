import React from 'react'
import { storiesOf } from '@storybook/react'
import UploadField from '../src/components/iconFont/testStrapiUpload'

storiesOf('test components', module)
  .add('test upload images to strapi', () => (
    <UploadField />
  ))