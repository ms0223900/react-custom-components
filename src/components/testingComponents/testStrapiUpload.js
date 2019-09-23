import React, { useState, useEffect, useCallback } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { apiUrl, ApolloProviderWrapper } from '../../../stories/API'
import { makeStyles } from '@material-ui/styles'
import downloadZip from './downloadZip'

const API = apiUrl.replace('/graphql', '')

const useStyles = makeStyles({
  iconsContainer: {
    display: 'inline-block',
    width: 100,
    height: 100,
    margin: 10,
    padding: 10,
    wordWrap: 'break-word',
    '& img': {
      width: '100%',
      height: '100%'
    }
  }
})

const UPLOAD_IMAGES = gql`
  mutation uploadIconImg($upload: createMaterialInput) {
    createMaterial(input: $upload) {
      material {
        id
        genre
        images {
          name
        }
      }
    }
  }`

const QUERY_ICONS = gql`
  query QUERY_ICONS {
    materials {
      genre
      version
      images {
        name
        url
      }
    }
  }`

const UploadField = () => {
  const classes = useStyles()
  const [images, setImages] = useState()
  const [uploadImages] = useMutation(UPLOAD_IMAGES)
  const { loading, data } = useQuery(QUERY_ICONS)
  const handleUpload = (e) => {
    const { target: { validity, files } } = e
    // validity.valid && 
    console.log(validity, files)
    uploadImages({
      variables: {
        images: files
      }
    })
  }
  const handleDownload = useCallback(() => {
    downloadZip(images)
  }, [images])
  useEffect(() => {
    if(data) {
      setImages(data.materials[0].images.map(img => API + img.url))
    }
  }, [data])
  if(loading) return 'loading...'
  const { materials } = data
  return (
    <Box>
      <form
        onChange={ handleUpload }
      >
        <input 
          type={'file'}
          multiple={true}
        />
      </form>
      <hr />
      <Box>
        {materials.map((material, i) => (
          <Box key={i}>
            <Typography variant={ 'h4' }>
              { `Genre: ${material.genre}` }
            </Typography>
            <Typography variant={ 'h5' }>
              { `Version: ${material.version}` }
            </Typography>
            <Typography variant={ 'h4' }>
              {'images'}
            </Typography>
            {material.images.map(img => (
              <Box key={ img.id } className={ classes.iconsContainer }>
                <Typography>
                  { img.name }
                </Typography>
                <img src={ API + img.url } />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <hr />
      <Box>
        <Button 
          variant={'contained'}
          onClick={ handleDownload }>
          {'download all'}
        </Button>
      </Box>
    </Box>
  )
}

export default () => {
  return (
    <ApolloProviderWrapper>
      <UploadField />
    </ApolloProviderWrapper>
  )
}