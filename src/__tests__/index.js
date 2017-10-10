import React from 'react'
import {mount} from 'enzyme'
import Toggler from '../'

test('on is defaulted to false', () => {
  const {on} = setup()
  expect(on).toBe(false)
})

test('on is defaulted to true when defaultOn is true', () => {
  const {on} = setup({defaultOn: true})
  expect(on).toBe(true)
})

test('on can be controlled', () => {
  const {on, setOff} = setup({on: true})
  expect(on).toBe(true)
  setOff()
  expect(on).toBe(true)
})

test('setOff sets `on` to false', () => {
  const {childSpy, setOff} = setup({defaultOn: true})
  setOff()
  expect(childSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({on: false})
  )
})

test('setOn sets `on` to true', () => {
  const {childSpy, setOn} = setup()
  setOn()
  expect(childSpy).toHaveBeenLastCalledWith(expect.objectContaining({on: true}))
})

test('toggle changes the `on` state', () => {
  const {childSpy, toggle} = setup()
  toggle()
  expect(childSpy).toHaveBeenLastCalledWith(expect.objectContaining({on: true}))
  toggle()
  expect(childSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({on: false})
  )
})

test('getTogglerProps for `on` false', () => {
  const {getTogglerProps} = setup({on: false})
  expect(getTogglerProps({id: 'extra'})).toMatchSnapshot()
})

test('getTogglerProps for `on` true', () => {
  const {getTogglerProps} = setup({on: true})
  expect(getTogglerProps({id: 'extra'})).toMatchSnapshot()
})

test('getTogglerProps does not blow up without an argument', () => {
  const {getTogglerProps} = setup({on: true})
  expect(() => getTogglerProps()).not.toThrow()
})

test('getTogglerProps sets a tabIndex if not present', () => {
  const {getTogglerProps} = setup()
  expect(getTogglerProps()).toHaveProperty('tabIndex', 0)
})

test('getTogglerProps passes existing tabIndex', () => {
  const {getTogglerProps} = setup()
  expect(getTogglerProps({tabIndex: 1})).toHaveProperty('tabIndex', 1)
})

test('getTogglerProps returns an onClick that calls the given onClick', () => {
  const {childSpy, getTogglerProps} = setup()
  const mockClick = jest.fn()
  const {onClick} = getTogglerProps({onClick: mockClick})
  const fakeEvent = {target: null}
  onClick(fakeEvent)
  expect(mockClick).toHaveBeenCalledTimes(1)
  expect(mockClick).toHaveBeenCalledWith(fakeEvent)
  expect(childSpy).toHaveBeenLastCalledWith(expect.objectContaining({on: true}))
})

test('getElementTogglerProps returns an onKeyUp that toggles on enter', () => {
  const {childSpy, getElementTogglerProps} = setup()
  const {onKeyUp} = getElementTogglerProps()
  const fakeEvent = {target: null, key: 'Enter'}
  onKeyUp(fakeEvent)
  expect(childSpy).toHaveBeenLastCalledWith(expect.objectContaining({on: true}))
})

test('getElementTogglerProps returns an onKeyUp that toggles on spacebar', () => {
  const {childSpy, getElementTogglerProps} = setup()
  const {onKeyUp} = getElementTogglerProps()
  const fakeEvent = {target: null, key: ' '}
  onKeyUp(fakeEvent)
  expect(childSpy).toHaveBeenLastCalledWith(expect.objectContaining({on: true}))
})

test('getElementTogglerProps returns an onKeyUp that does not toggle on other keys', () => {
  const {childSpy, getElementTogglerProps} = setup()
  const {onKeyUp} = getElementTogglerProps()
  const fakeEvent = {target: null}
  onKeyUp(fakeEvent)
  expect(childSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({on: false})
  )
})

test('getInputTogglerProps returns an onKeyUp that toggles on enter', () => {
  const {childSpy, getInputTogglerProps} = setup()
  const {onKeyUp} = getInputTogglerProps()
  const fakeEvent = {target: null, key: 'Enter'}
  onKeyUp(fakeEvent)
  expect(childSpy).toHaveBeenLastCalledWith(expect.objectContaining({on: true}))
})

test('getInputTogglerProps returns an onKeyUp that does not toggle on spacebar', () => {
  const {childSpy, getInputTogglerProps} = setup()
  const {onKeyUp} = getInputTogglerProps()
  const fakeEvent = {target: null}
  onKeyUp(fakeEvent)
  expect(childSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({on: false})
  )
})

test('children can be an array (for preact support)', () => {
  const childSpy = jest.fn(() => <div />)
  mount(<Toggler>{[childSpy]}</Toggler>)
  expect(childSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({on: false})
  )
})

function setup({children = () => <div />, ...props} = {}) {
  let renderArg
  const childSpy = jest.fn(controllerArg => {
    renderArg = controllerArg
    return children(controllerArg)
  })
  const wrapper = mount(<Toggler {...props}>{childSpy}</Toggler>)
  return {childSpy, wrapper, ...renderArg}
}
