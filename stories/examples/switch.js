import React from 'react'
import Toggle from '../../src'

function Switch() {
  return (
    <Toggle>
      {({on, getElementTogglerProps}) => (
        <span
          role="switch"
          aria-checked={on.toString()}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            width: '40px',
            height: '20px',
          }}
          {...getElementTogglerProps()}
        >
          <span
            style={{
              flex: 1,
              height: '100%',
              borderRadius: '10px',
              background: on ? 'green' : 'gray',
            }}
          />
          <span
            style={{
              position: 'absolute',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'white',
              transition: 'transform 0.3s',
              transform: on ? 'translateX(22px)' : 'translateX(2px)',
            }}
          />
        </span>
      )}
    </Toggle>
  )
}

export default Switch
