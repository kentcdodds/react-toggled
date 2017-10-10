// Tell Babel to transform JSX into preact.h() calls:
/** @jsx preact.h */
/*
eslint-disable
react/prop-types,
no-console,
react/display-name,
import/extensions,
import/no-unresolved
*/

/*
Testing the preact version is a tiny bit complicated because
we need the preact build (the one that imports 'preact' rather
than 'react') otherwise things don't work very well.
So there's a script `test.build` which will run the cjs build
for preact before running this test.
 */

import preact from 'preact'
import render from 'preact-render-to-string'
import Toggle from '../../../preact/dist/react-toggled.esm'

test('works with preact', () => {
  const childSpy = jest.fn(({on, getTogglerProps}) => (
    <div>
      <button {...getTogglerProps()}>accessible toggle button</button>
      <div>{on ? 'Toggled On' : 'Toggled Off'}</div>
    </div>
  ))
  render(<Toggle>{childSpy}</Toggle>)
  expect(childSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      on: false,
    }),
  )
})
