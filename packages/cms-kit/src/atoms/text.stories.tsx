import React from 'react'

import {centerLayoutDecorator, InfoBox} from '../.storybook/decorators'
import {
  TextSmall,
  TextMedium,
  FontFace,
  Heading1,
  Heading2,
  Heading3,
  TextExtraLarge,
  Label,
  Hint,
  Description
} from '../style/textStyles'

export default {
  component: Text,
  title: 'Atoms|Texts',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <>
    <div>
      <InfoBox infoText={'Small regular'} padding={10}>
        <TextSmall>{mockText}</TextSmall>
      </InfoBox>
      <InfoBox infoText={'Small italic'} padding={10}>
        <TextSmall fontFace={FontFace.Italic}>{mockText}</TextSmall>
      </InfoBox>
      <InfoBox infoText={'Small bold'} padding={10}>
        <TextSmall fontFace={FontFace.Bold}>{mockText}</TextSmall>
      </InfoBox>
      <InfoBox infoText={'Label'} padding={10}>
        <Label>{mockText}</Label>
      </InfoBox>
      <InfoBox infoText={'Description'} padding={10}>
        <Description>{mockText}</Description>
      </InfoBox>
      <InfoBox infoText={'Description italic'} padding={10}>
        <Description fontFace={FontFace.Italic}>{mockText}</Description>
      </InfoBox>
    </div>
    <div>
      <InfoBox infoText={'Medium regular'} padding={10}>
        <TextMedium>{mockText}</TextMedium>
      </InfoBox>
      <InfoBox infoText={'Medium bold'} padding={10}>
        <TextMedium fontFace={FontFace.Bold}>{mockText}</TextMedium>
      </InfoBox>
      <InfoBox infoText={'Hint'} padding={10}>
        <Hint>{mockText}</Hint>
      </InfoBox>
    </div>
    <div>
      <InfoBox infoText={'Heading1'} padding={10}>
        <Heading1>{mockText}</Heading1>
      </InfoBox>
      <InfoBox infoText={'Heading2'} padding={10}>
        <Heading2>{mockText}</Heading2>
      </InfoBox>
      <InfoBox infoText={'Heading3'} padding={10}>
        <Heading3>{mockText}</Heading3>
      </InfoBox>
    </div>
    <div>
      <InfoBox infoText={'ExtraLarge'} padding={10}>
        <TextExtraLarge>{mockText}</TextExtraLarge>
      </InfoBox>
    </div>
  </>
)

const mockText = 'Lorem ipsum'
