<h1 align="center">
  react-toggled ⚛️
  <br>
  <img src="https://cdn.rawgit.com/kentcdodds/react-toggled/master/other/logo/react-toggled.png" alt="react-toggled logo" title="react-toggled logo" width="300">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">Component to build simple, flexible, and accessible toggle components</p>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![downloads][downloads-badge]][npmcharts]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Chat][chat-badge]][chat]
[![Code of Conduct][coc-badge]][coc]

[![Supports React and Preact][react-badge]][react]
[![size][size-badge]][unpkg-dist]
[![gzip size][gzip-badge]][unpkg-dist]
[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## The problem

You want a toggle component that's simple and gives you complete control over
rendering and state.

## This solution

This follows the patterns in [`downshift`][downshift] to expose an API that
renders nothing and simply encapsulates the logic of a toggle component.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Installation](#installation)
* [Usage](#usage)
* [Props:](#props)
  * [defaultOn](#defaulton)
  * [onToggle](#ontoggle)
  * [on](#on)
  * [children](#children)
* [Examples](#examples)
* [Inspiration](#inspiration)
* [Other Solutions](#other-solutions)
* [Contributors](#contributors)
* [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save react-toggled
```

> This package also depends on `react` and `prop-types`. Please make sure you
> have those installed as well.

> Note also this library supports `preact` out of the box. If you are using
> `preact` then look in the `preact/` folder and use the module you want.
> You should be able to simply do: `import Toggle from 'react-toggled/preact'`

## Usage

```jsx
import React from 'react'
import {render} from 'react-dom'
import Toggle from 'react-toggled'

render(
  <Toggle>
    {({on, getTogglerProps}) => (
      <div>
        <button {...getTogglerProps()}>Toggle me</button>
        <div>{on ? 'Toggled On' : 'Toggled Off'}</div>
      </div>
    )}
  </Toggle>,
  document.getElementById('root'),
)
```

`react-toggled` is the only component. It doesn't render anything itself, it just
calls the child function and renders that. Wrap everything in
`<Toggle>{/* your function here! */}</Toggle>`.

## Props:

### defaultOn

> `boolean` | defaults to `false`

The initial `on` state.

### onToggle

> `function(on: boolean, object: TogglerStateAndHelpers)` | optional, no useful default

Called when the toggler is clicked.

* `on`: The new on state
* `TogglerStateAndHelpers`: the exact same thing you get in your child render
  prop function.

### on

> `boolean` | **control prop**

react-toggled manages its own state internally and calls your `onToggle`
handler whenever the `on` state changes. Your child render prop function
(read more below) can be used to manipulate this state from within the render
function and can likely support many of your use cases.

However, if more control is needed, you can pass the `on` state as a prop
and that state becomes controlled. As soon as
`this.props.on !== undefined`, internally, `react-toggled` will determine
its state based on your prop's value rather than its own internal state. You
will be required to keep the state up to date (this is where `onToggle` comes in
really handy), but you can also control the state from anywhere, be
that state from other components, `redux`, `react-router`, or anywhere else.

> Note: This is very similar to how normal controlled components work elsewhere
> in react (like `<input />`). If you want to learn more about this concept, you
> can learn about that from this the
> ["Controlled Components" lecture][controlled-components-lecture] and
> exercises from [React Training's][react-training] > [Advanced React][advanced-react] course.

### children

> `function({})` | _required_

This is called with an object.

This is where you render whatever you want to based on the state of `react-toggled`.
The function is passed as the child prop:
`<Toggle>{/* right here*/}</Toggle>`

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| property                 | category    | type                      | description                                                                                                                                                    |
| ------------------------ | ----------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on`                     | state       | `boolean`                 | The current `on` state of toggle                                                                                                                               |
| `getTogglerProps`        | prop getter | `function(props: object)` | returns the props you should apply to the button element you render. Includes `aria-` attributes                                                               |
| `getInputTogglerProps`   | prop getter | `function(props: object)` | returns the props you should apply to the input (checkbox) element you render. Includes `aria-` attributes                                                     |
| `getElementTogglerProps` | prop getter | `function(props: object)` | returns the props you should apply to the element you render. Use this if you are not using a button or input—for example, a span. Includes `aria-` attributes |
| `setOn`                  | action      | `function()`              | Sets the `on` state to `true`                                                                                                                                  |
| `setOff`                 | action      | `function()`              | Sets the `on` state to `false`                                                                                                                                 |
| `toggle`                 | action      | `function()`              | Toggles the `on` state (i.e. if it's currently `true`, will set to `false`)                                                                                    |

## Examples

Examples exist on [codesandbox.io][examples]:

* [Bare bones toggle](https://codesandbox.io/s/m38674w9vy)

If you would like to add an example, follow these steps:

1. Fork [this codesandbox](https://codesandbox.io/s/m38674w9vy)
2. Make sure your version (under dependencies) is the latest available version.
3. Update the title and description
4. Update the code for your example (add some form of documentation to explain what it is)
5. Add the tag: `react-toggled:example`

You'll find other examples in the `stories/examples` folder of the repo.
And you'll find
[a live version of those examples here](https://react-toggled.netlify.com)

## Inspiration

I built this while building [an example of using `glamorous` with `next.js`][glamorous-with-next]

## Other Solutions

You can implement any of the other solutions using `react-toggled`, but if
you'd prefer to use these out of the box solutions, then that's fine too. There
are tons of them, so just
[checkout npm](https://www.npmjs.com/search?q=react%20toggle).

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;"/><br /><sub><b>Kent C. Dodds</b></sub>](https://kentcdodds.com)<br />[💻](https://github.com/kentcdodds/react-toggled/commits?author=kentcdodds "Code") [📖](https://github.com/kentcdodds/react-toggled/commits?author=kentcdodds "Documentation") [🚇](#infra-kentcdodds "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/kentcdodds/react-toggled/commits?author=kentcdodds "Tests") | [<img src="https://avatars3.githubusercontent.com/u/9488719?v=4" width="100px;"/><br /><sub><b>Frank Tan</b></sub>](https://github.com/tansongyang)<br />[💻](https://github.com/kentcdodds/react-toggled/commits?author=tansongyang "Code") [📖](https://github.com/kentcdodds/react-toggled/commits?author=tansongyang "Documentation") [⚠️](https://github.com/kentcdodds/react-toggled/commits?author=tansongyang "Tests") | [<img src="https://avatars1.githubusercontent.com/u/9408641?v=4" width="100px;"/><br /><sub><b>Oliver</b></sub>](http://www.oliverjam.es)<br />[💻](https://github.com/kentcdodds/react-toggled/commits?author=oliverjam "Code") | [<img src="https://avatars2.githubusercontent.com/u/11708648?v=4" width="100px;"/><br /><sub><b>Jedrzej Lewandowski</b></sub>](http://www.thefullresolution.com/)<br />[💻](https://github.com/kentcdodds/react-toggled/commits?author=TheFullResolution "Code") | [<img src="https://avatars1.githubusercontent.com/u/603386?v=4" width="100px;"/><br /><sub><b>Ben Slinger</b></sub>](https://github.com/bslinger)<br />[💻](https://github.com/kentcdodds/react-toggled/commits?author=bslinger "Code") [⚠️](https://github.com/kentcdodds/react-toggled/commits?author=bslinger "Tests") |
| :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/kentcdodds/react-toggled.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/react-toggled
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/react-toggled.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/react-toggled
[version-badge]: https://img.shields.io/npm/v/react-toggled.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-toggled
[downloads-badge]: https://img.shields.io/npm/dm/react-toggled.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/react-toggled
[license-badge]: https://img.shields.io/npm/l/react-toggled.svg?style=flat-square
[license]: https://github.com/kentcdodds/react-toggled/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[chat]: https://gitter.im/kentcdodds/react-toggled
[chat-badge]: https://img.shields.io/gitter/room/kentcdodds/react-toggled.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/react-toggled/blob/master/other/CODE_OF_CONDUCT.md
[react-badge]: https://img.shields.io/badge/%E2%9A%9B%EF%B8%8F-(p)react-00d8ff.svg?style=flat-square
[react]: https://facebook.github.io/react/
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-toggled/dist/react-toggled.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-toggled/dist/react-toggled.umd.min.js?label=size&style=flat-square
[unpkg-dist]: https://unpkg.com/react-toggled/dist/
[module-formats-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/kentcdodds/react-toggled.svg?style=social
[github-watch]: https://github.com/kentcdodds/react-toggled/watchers
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/react-toggled.svg?style=social
[github-star]: https://github.com/kentcdodds/react-toggled/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-toggled%20by%20%40kentcdodds%20https%3A%2F%2Fgithub.com%2Fkentcdodds%2Freact-toggled%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/react-toggled.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[ryan]: https://github.com/ryanflorence
[compound-components-lecture]: https://courses.reacttraining.com/courses/advanced-react/lectures/3060560
[examples]: https://codesandbox.io/search?refinementList%5Btags%5D%5B0%5D=react-toggled%3Aexample&page=1
[controlled-components-lecture]: https://courses.reacttraining.com/courses/advanced-react/lectures/3172720
[react-training]: https://reacttraining.com/
[advanced-react]: https://courses.reacttraining.com/courses/enrolled/200086
[fac]: https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9
[glamorous-with-next]: https://github.com/kentcdodds/glamorous-with-next
[downshift]: https://github.com/paypal/downshift
