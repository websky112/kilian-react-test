import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors, FontSizes } from '../../lib/style-guide'
import CircleProgressBar from './circleProgressBar'

declare const require: any

const Container = styled.div`
  background: ${Colors.PureWhite};
  border: 1px dashed ${Colors.AccordBlue1};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
`

const HighLightContainer = styled(Container)`
  background: ${Colors.BG3};
  border: 1px dashed ${Colors.AccordBlue};
`

const ImageContainer = styled.div`
  background: ${Colors.PureWhite};
  border-radius: 50%;
  width: 78px;
  height: 78px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`

const Span = styled.span`
  ${FontSizes.medium}
	color: ${Colors.TX3};
	line-height: 1;
	margin-top: 8px;
`

const UploadButton = styled.a`
  ${FontSizes.medium}
  color: ${Colors.AccordBlue1};
`

const Dropzone = ({
  onFilesAdded,
  uploading,
  uploadProgress,
  successfullUploaded
}: {
  onFilesAdded: Function
  uploading: boolean
  uploadProgress: any
  successfullUploaded: boolean
}) => {
  const [highLight, setHighLight] = useState(false)
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null)

  const fileInputRef = React.createRef<HTMLInputElement>()

  const openFileDialog = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click()
    }
  }

  const onDragOver = (event: any) => {
    event.preventDefault()
    setHighLight(true)
  }

  const onDragLeave = () => {
    setHighLight(false)
  }

  const onDrop = (event: any) => {
    event.preventDefault()

    const files = event.dataTransfer.files
    const array = fileListToArray(files)
    onFilesAdded(array)
    setHighLight(false)

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setImageData(fileReader.result)
    }
    fileReader.readAsDataURL(files[0])
  }

  const onFileAdded = (event: any) => {
    const files = event.target.files
    const array = fileListToArray(files)
    onFilesAdded(array)

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setImageData(fileReader.result)
    }
    fileReader.readAsDataURL(files[0])
  }

  const fileListToArray = (list: any) => {
    const array = []
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  return highLight ? (
    <HighLightContainer
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <ImageContainer>
        <CircleProgressBar
          percentage={uploadProgress.percentage ? uploadProgress.percentage : 0}
        />
        <img
          src={
            imageData && !uploading
              ? imageData
              : require('../../icons/logoicon.png')
          }
          style={{ maxHeight: 80 }}
        ></img>
      </ImageContainer>
      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        onChange={onFileAdded}
      />
      {uploading ? (
        <>
          <Span>Uploading</Span>
          <Span>- or -</Span>
          <UploadButton>Cancel</UploadButton>
        </>
      ) : (
        <>
          <Span>Drag & drop here</Span>
          <Span>- or -</Span>
          <UploadButton>Select file to upload</UploadButton>
        </>
      )}
    </HighLightContainer>
  ) : (
    <Container
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <ImageContainer>
        <CircleProgressBar
          percentage={uploadProgress.percentage ? uploadProgress.percentage : 0}
        />
        <img
          src={
            imageData && !uploading
              ? imageData
              : require('../../icons/logoicon.png')
          }
          style={{ maxHeight: 80 }}
        ></img>
      </ImageContainer>
      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        multiple
        onChange={onFileAdded}
      />
      {uploading ? (
        <>
          <Span>Uploading</Span>
          <Span>- or -</Span>
          <UploadButton>Cancel</UploadButton>
        </>
      ) : (
        <>
          <Span>Drag & drop here</Span>
          <Span>- or -</Span>
          <UploadButton>Select file to upload</UploadButton>
        </>
      )}
    </Container>
  )
}

export { Dropzone }
