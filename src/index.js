import {useState} from 'react'
import PropTypes from 'prop-types'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

function useToggle({
  defaultOn = false,
  onUseState = useState(defaultOn),
  on = onUseState[0],
  setOnState = onUseState[1],
} = {}) {
  const setOn = () => setOnState(true)
  const setOff = () => setOnState(false)
  const toggle = () => setOnState(!on)

  const getTogglerProps = (props = {}) => ({
    'aria-expanded': Boolean(on),
    tabIndex: 0,
    ...props,
    onClick: callAll(props.onClick, toggle),
  })

  const getInputTogglerProps = (props = {}) =>
    getTogglerProps({
      ...props,
      onKeyUp: callAll(props.onKeyUp, event => {
        if (event.key === 'Enter') {
          // <input> already respond to Enter
          toggle()
        }
      }),
    })

  const toggleKeys = ['Enter', ' '] // This matches <button> behavior

  const getElementTogglerProps = (props = {}) =>
    getTogglerProps({
      ...props,
      onKeyUp: callAll(props.onKeyUp, event => {
        if (toggleKeys.indexOf(event.key) > -1) {
          toggle()
        }
      }),
    })

  function getTogglerStateAndHelpers() {
    return {
      on,
      getTogglerProps,
      getInputTogglerProps,
      getElementTogglerProps,
      setOn,
      setOff,
      toggle,
    }
  }

  return getTogglerStateAndHelpers()
}

const Toggle = ({children, ...props}) => unwrapArray(children)(useToggle(props))
Toggle.propTypes = {
  defaultOn: PropTypes.bool,
  on: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
}

export {useToggle}
export default Toggle

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @return {*} the arg or it's first item
 */
function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg
}
