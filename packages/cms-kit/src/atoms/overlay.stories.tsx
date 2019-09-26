import React from 'react'

import {Overlay} from './overlay'
import {TextInput} from './textInput'
import {InfoListingItem} from './infoListingItem'

export default {
  component: Overlay,
  title: 'Atoms|Overlay'
}

export const PublishArticle = () => (
  <Overlay title={'Publish Article'} onConfirm={() => {}}>
    <TextInput
      label={'Publish state'}
      value={''}
      description={'Set state to Proofreading or Live'}
      onChange={() => {}}
    />
    <InfoListingItem label={'Teaser type'} value={'image & Title'} />
    <InfoListingItem label={'Title'} value={'Massenpanik am New Yorker Times Square'} />
    <InfoListingItem label={'Author'} value={'Gabriel Anliker'} />
    <InfoListingItem label={'Share with peers'} value={'Yes'} />
    <InfoListingItem label={'Hasthags'} value={'Tag1, Tag2, Tag3'} />
    <InfoListingItem label={'Publish date'} value={'08.08.2019'} />
    <InfoListingItem label={'Expire date'} value={'None'} />
  </Overlay>
)
