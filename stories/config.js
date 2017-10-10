/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import {configure, storiesOf} from '@storybook/react'
import React from 'react'

import Basic from './examples/basic'
import Checkbox from './examples/checkbox'
import Switch from './examples/switch'

function loadStories() {
  // clear the console to make debugging experience better
  console.clear()

  storiesOf('Examples', module)
    .add('basic', () => <Basic />)
    .add('checkbox', () => <Checkbox />)
    .add('switch', () => <Switch />)
}

configure(loadStories, module)
