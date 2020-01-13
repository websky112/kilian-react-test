import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'
import { Spinner } from './components/shared/spinner'
import FileUploader from './components/shared/uploader'

console.info(`⚛️ ${React.version}`)

const App = () => (
  <>
    <GlobalStyle />
    {/* <Spinner /> */}
    <FileUploader />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))

module.hot && module.hot.accept()
