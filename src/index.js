import {useState, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

function useToggle({defaultOn = false, ...toggleProps} = {}) {
  const internalState = useState(defaultOn)
  const {
    onUseState = internalState,
    on = onUseState[0],
    setOnState = onUseState[1],
  } = toggleProps
  if (process.env.NODE_ENV !== 'production') {
    const usesInternalState = internalState === onUseState
    const previousUsesInternalState = useRef(usesInternalState)

    if (previousUsesInternalState.current !== usesInternalState) {
      previousUsesInternalState.current = usesInternalState
      // eslint-disable-next-line no-console
      console.warn(
        'A Toggle Component or Hook is chaning from being uncontrolled to be controlled (or vice versa)' +
          'A Toggle Component or Hook should not switch from uncontrolled to controlled (or vice versa). ' +
          'Decide between using a controlled or uncontrolled Toggle element or hooks ' +
          'for the lifetime of the component.',
      )
    }
  }
  const setOn = useCallback(() => setOnState(true), [setOnState])
  const setOff = useCallback(() => setOnState(false), [setOnState])
  const toggle = useCallback(() => setOnState(oldOn => !oldOn), [setOnState])

  const getTogglerProps = useCallback(
    (props = {}) => ({
      'aria-expanded': Boolean(on),
      tabIndex: 0,
      ...props,
      onClick: callAll(props.onClick, toggle),
    }),
    [on, toggle],
  )

  const getInputTogglerProps = useCallback(
    (props = {}) =>
      getTogglerProps({
        ...props,
        onKeyUp: callAll(props.onKeyUp, event => {
          if (event.key === 'Enter') {
            // <input> already respond to Enter
            toggle()
          }
        }),
      }),
    [toggle],
  )

  const toggleKeys = ['Enter', ' '] // This matches <button> behavior

  const getElementTogglerProps = useCallback(
    (props = {}) =>
      getTogglerProps({
        ...props,
        onKeyUp: callAll(props.onKeyUp, event => {
          if (toggleKeys.indexOf(event.key) > -1) {
            toggle()
          }
        }),
      }),
    [toggle],
  )

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
