import React from 'react'
import ContextWrapper from './context';
import TestComponent from './TestComponent';

export default () => (
  <ContextWrapper>
    <TestComponent />
  </ContextWrapper>
)