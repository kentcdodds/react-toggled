import React from 'react'
import Toggle from '../../src'

function Checkbox() {
  return (
    <Toggle>
      {({on, getTogglerProps}) => (
        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '20px',
            height: '20px',
          }}
        >
          <input
            type="checkbox"
            checked={on}
            role="role"
            aria-checked={on.toString()}
            style={{
              width: '100%',
              height: '100%',
              margin: 0,
            }}
            {...getTogglerProps()}
          />
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: on ? 'green' : 'gray',
              pointerEvents: 'none',
            }}
          />
        </span>
      )}
    </Toggle>
  )
}

export default Checkbox
