const JSZIP = require('jszip')
const saveAs = require('jszip/vendor/FileSaver')
const zip = new JSZIP()

const images = zip.folder('images')

const createFile = async (imageURI) => {
  const res = await fetch(imageURI)
  const data = await res.blob()
  // console.log(data)
  return data
}

const downloadZip = async (imageUrls=[]) => {
  for (const i in imageUrls) {
    const imgData = await createFile(imageUrls[i])
    console.log(imageUrls[i], imgData)
    images.file(`img${ i }.svg`, imgData)
  }
  zip.generateAsync({ type: 'blob' })
    .then((ctx) => {
      // console.log(ctx)
      saveAs(ctx, 'images.zip')
    })
}

export default downloadZip