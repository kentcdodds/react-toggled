import * as React from 'react'
import Toggle from '../'

interface Props {}

interface State {}

export default class App extends React.Component<Props, State> {

  onClickCall = () => console.log('hello')

  render() {
    return (
      <Toggle>
        {({
          on,
          getTogglerProps,
          toggle,
          setOn,
          setOff,
          getInputTogglerProps,
          getElementTogglerProps
        }) => (
          <div>
            <button {...getTogglerProps({onClick: this.onClickCall})}>Toggle</button>
            <button onClick={toggle}>uses toggle action</button>
            <button onClick={setOn}>set on</button>
            <button onClick={setOff}>set off</button>
            <input
              type="button"
              value="Toggle Input"
              {...getInputTogglerProps()}
            />
            <span {...getElementTogglerProps()}>ToggleSpan</span>
            <div>{on ? 'Toggled On' : 'Toggled Off'}</div>
          </div>
        )}
      </Toggle>
    )
  }
}
