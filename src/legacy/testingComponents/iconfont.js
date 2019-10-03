// import React from 'react'
const React = require('react')
// import './style.css'

export const FontTest = ({ className, ...props }) => (
  <span 
    className={ 'icon-stationListArrowImg' + ' ' + className } {...props} />
)
