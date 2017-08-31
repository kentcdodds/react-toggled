/*
 * This file is here to validate that the built version
 * of the library exposes the module in the way that we
 * want it to. Specifically that the ES6 module import can
 * get the react-toggled function via default import. Also that
 * the CommonJS require returns the react-toggled function
 * (rather than an object that has the react-toggled as a
 * `default` property).
 *
 * This file is unable to validate the global export.
 */
import assert from 'assert'

import esImport from '../dist/react-toggled.es'

import cjsImport from '../' // picks up the main from package.json

import umdImport from '../dist/react-toggled.umd'

// intentionally left out because you shouldn't ever
// try to require the ES file in CommonJS
// const esRequire = require('../dist/react-toggled.es')
const cjsRequire = require('../') // picks up the main from package.json
const umdRequire = require('../dist/react-toggled.umd')

test('stuff is good', () => {
  assert(isToggleComponent(esImport), 'ES build has a problem with ES Modules')

  assert(
    isToggleComponent(cjsImport),
    'CJS build has a problem with ES Modules'
  )

  assert(isToggleComponent(cjsRequire), 'CJS build has a problem with CJS')

  assert(
    isToggleComponent(umdImport),
    'UMD build has a problem with ES Modules'
  )

  assert(isToggleComponent(umdRequire), 'UMD build has a problem with CJS')

  // TODO: how could we validate the global export?
})

function isToggleComponent(thing) {
  if (typeof thing !== 'function') {
    console.error(
      `react-toggled thing should be a function. It's a ${typeof thing} with the properties of: ${Object.keys(
        thing
      ).join(', ')}`
    )
    return false
  }
  return true
}

/*
 eslint
  no-console: 0,
  import/extensions: 0,
  import/no-unresolved: 0,
  import/no-duplicates: 0,
  no-duplicate-imports: 0,
 */
