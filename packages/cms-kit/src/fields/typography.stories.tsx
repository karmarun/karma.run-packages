import React from 'react'

import {centerLayoutDecorator, InfoBox} from '../.storybook/decorators'
import {Typography} from './typography'
import {Spacing} from '../style/helpers'

export default {
  component: Typography,
  title: 'Atoms|Typography',
  decorators: [centerLayoutDecorator()]
}

export const All = () => (
  <>
    <InfoBox infoText="title" padding={Spacing.ExtraSmall}>
      <Typography variant="title">Title</Typography>
    </InfoBox>
    <InfoBox infoText="h1" padding={Spacing.ExtraSmall}>
      <Typography variant="h1">Heading 1</Typography>
    </InfoBox>
    <InfoBox infoText="h2" padding={Spacing.ExtraSmall}>
      <Typography variant="h2">Heading 2</Typography>
    </InfoBox>
    <InfoBox infoText="h3" padding={Spacing.ExtraSmall}>
      <Typography variant="h3">Heading 3</Typography>
    </InfoBox>
    <InfoBox infoText="body1" padding={Spacing.ExtraSmall}>
      <Typography variant="body1">Body 1</Typography>
    </InfoBox>
    <InfoBox infoText="body2" padding={Spacing.ExtraSmall}>
      <Typography variant="body2">Body 2</Typography>
    </InfoBox>
    <InfoBox infoText="subtitle1" padding={Spacing.ExtraSmall}>
      <Typography variant="subtitle1">Subtitle 1</Typography>
    </InfoBox>
    <InfoBox infoText="subtitle2" padding={Spacing.ExtraSmall}>
      <Typography variant="subtitle2">Subtitle 2</Typography>
    </InfoBox>
  </>
)
