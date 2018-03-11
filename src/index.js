import {Component} from 'react'
import PropTypes from 'prop-types'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Toggle extends Component {
  static propTypes = {
    defaultOn: PropTypes.bool,
    on: PropTypes.bool,
    onToggle: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
  }
  static defaultProps = {
    defaultOn: false,
    onToggle: () => {},
  }
  state = {
    on: this.getOn({on: this.props.defaultOn}),
  }

  getOn(state = this.state, props = this.props) {
    return this.isOnControlled() ? props.on : state.on
  }

  isOnControlled() {
    return this.props.on !== undefined
  }

  getTogglerProps = (props = {}) => ({
    'aria-expanded': Boolean(this.getOn()),
    tabIndex: 0,
    ...props,
    onClick: callAll(props.onClick, this.toggle),
  })

  toggleKeys = ['Enter', ' '] // This matches <button> behavior

  getInputTogglerProps = (props = {}) =>
    this.getTogglerProps({
      ...props,
      onKeyUp: callAll(props.onKeyUp, event => {
        if (event.key === 'Enter') {
          // <input> already respond to Enter
          this.toggle()
        }
      }),
    })

  getElementTogglerProps = (props = {}) =>
    this.getTogglerProps({
      ...props,
      onKeyUp: callAll(props.onKeyUp, event => {
        if (this.toggleKeys.indexOf(event.key) > -1) {
          this.toggle()
        }
      }),
    })

  getTogglerStateAndHelpers() {
    return {
      on: this.getOn(),
      getTogglerProps: this.getTogglerProps,
      getInputTogglerProps: this.getInputTogglerProps,
      getElementTogglerProps: this.getElementTogglerProps,
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle,
    }
  }

  setOnState = (state = !this.getOn()) => {
    this.setState({on: state})
  }

  setOn = this.setOnState.bind(this, true)
  setOff = this.setOnState.bind(this, false)
  toggle = this.setOnState.bind(this, undefined)

  componentDidUpdate(prevProps, prevState) {
    const on = this.getOn()

    if (this.getOn(prevState, prevProps) !== on) {
      this.props.onToggle(on, this.getTogglerStateAndHelpers())
    }
  }

  render() {
    const renderProp = unwrapArray(this.props.children)
    return renderProp(this.getTogglerStateAndHelpers())
  }
}

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @return {*} the arg or it's first item
 */
function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg
}

export default Toggle
