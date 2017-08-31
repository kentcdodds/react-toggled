import React from 'react'
import Toggle from '../../src'

function Basic() {
  return (
    <Toggle>
      {({on, getTogglerProps, setOn, setOff, toggle}) => (
        <div>
          <button {...getTogglerProps()}>accessible toggle button</button>
          <button onClick={toggle}>uses toggle action</button>
          <button onClick={setOn}>set on</button>
          <button onClick={setOff}>set off</button>
          <div>{on ? 'Toggled On' : 'Toggled Off'}</div>
        </div>
      )}
    </Toggle>
  )
}

export default Basic
