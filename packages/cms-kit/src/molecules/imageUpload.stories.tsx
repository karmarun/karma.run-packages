import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ImageUpload} from './imageUpload'

export default {
  component: ImageUpload,
  title: 'Molecules|ImageUpload',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Standard = () => {
  const [files, setFiles] = useState([])

  function addFiles(fileList: FileList) {
    let newFiles = files
    for (let i = 0; i < fileList.length; i++) {
      newFiles.push(fileList.item(i))
    }
    setFiles(newFiles)
  }

  console.log(files)

  return <ImageUpload onDrop={addFiles} images={[]} isProcessing={false} onDelete={id => {}} />
}

export const Upload = () => (
  <ImageUpload
    onDrop={fileList => {}}
    images={mockThumbImages}
    isProcessing={false}
    onDelete={id => {}}
  />
)

export const InProcess = () => (
  <ImageUpload
    onDrop={fileList => {}}
    images={mockThumbImages}
    isProcessing={true}
    onDelete={id => {}}
  />
)

const mockThumbImages = [
  {id: 'banana', src: 'https://dummyimage.com/100x68/000/fff', size: '1.1MB', name: 'Banana.jpg'},
  {id: 'flower', src: 'https://dummyimage.com/100x68/ba37ba/fff', size: '1.5MB', name: 'flower.jpg'}
]
