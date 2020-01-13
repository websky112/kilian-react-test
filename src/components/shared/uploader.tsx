import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Dropzone } from './dropzone'

import { Colors, FontSizes, FontWeights } from '../../lib/style-guide'

const Container = styled.div`
  width: 400px;
  height: 590px;
  background: ${Colors.PureWhite};
  margin: auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.Border};
`

const HeaderContainer = styled.div`
  padding: 20px 29px;
  border-bottom: 1px solid ${Colors.Border};
`

const Span = styled.span`
  ${FontSizes.medium};
  color: ${Colors.TX3};
`

const Title = styled.h2`
  ${FontSizes.extraLarge};
  color: ${Colors.TX1};
  font-weight: ${FontWeights.HB};
`

const ContentContainer = styled.div`
  padding: 20px;
  height: 100%;
`

const CANONICAL_QUERY_STRING = ''
const REQUEST_SIGNATURE = ''

const FileUploader = () => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [successfullUploaded, setSuccessfullUploaded] = useState(false)

  const onFilesAdded = (file: any) => {
    setUploadProgress({})
    setFiles(file)
  }

  const getSignedURL = () =>
    `https://storage.googleapis.com/test-image-bucket/image.jpg?${CANONICAL_QUERY_STRING}X-Goog-Signature=${REQUEST_SIGNATURE}`

  const sendRequest = (file: any) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()
      const signedURL = getSignedURL()

      req.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const copy = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100
          }
          setUploadProgress(copy)
        }
      })

      req.upload.addEventListener('load', () => {
        const copy = {
          state: 'done',
          percentage: 100
        }
        setUploadProgress(copy)
        resolve(req.response)
      })

      req.upload.addEventListener('error', () => {
        const copy = {
          state: 'error',
          percentage: 0
        }
        setUploadProgress(copy)
        reject(req.response)
      })

      const formData = new FormData()
      formData.append('file', file, file.name)

      req.open('POST', signedURL)
      req.setRequestHeader('Access-Control-Allow-Origin', '*')
      req.setRequestHeader('x-goog-resumable', 'start')
      req.send(formData)
    })
  }

  const uploadFiles = async () => {
    setUploading(true)
    try {
      await sendRequest(files[0])
      setSuccessfullUploaded(true)
      setUploading(false)
    } catch (error) {
      setSuccessfullUploaded(false)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (
      files.length > 0 &&
      !uploading &&
      Object.keys(uploadProgress).length === 0
    ) {
      console.log('useEffect files', files)
      uploadFiles()
    }
  })

  return (
    <Container>
      <HeaderContainer>
        <Title>Company Logo</Title>
        <Span>
          Logo should be square, 100px size and in png, jpeg file format
        </Span>
      </HeaderContainer>
      <ContentContainer>
        <Dropzone
          onFilesAdded={onFilesAdded}
          uploading={uploading}
          uploadProgress={uploadProgress}
          successfullUploaded={successfullUploaded}
        />
      </ContentContainer>
    </Container>
  )
}

export default FileUploader
