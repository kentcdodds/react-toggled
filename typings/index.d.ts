import * as React from 'react'

export interface GetElementPropsOptions extends React.HTMLProps<HTMLElement> {}

export interface GetInputPropsOptions
  extends React.HTMLProps<HTMLInputElement> {}

export interface GetButtonPropsOptions
  extends React.HTMLProps<HTMLButtonElement> {}

export interface TogglerStateAndHelpers {
  readonly on: boolean
  readonly getTogglerProps: (options?: GetButtonPropsOptions) => any
  readonly getInputTogglerProps: (options?: GetButtonPropsOptions) => any
  readonly getElementTogglerProps: (options?: GetElementPropsOptions) => any
  readonly setOn: () => void
  readonly setOff: () => void
  readonly toggle: () => void
}

export type ChildrenFunction = (
  options: TogglerStateAndHelpers,
) => React.ReactNode

export interface ReactToggledProps {
  readonly defaultOn?: boolean
  readonly onToggle?: (on: boolean, object: TogglerStateAndHelpers) => void
  readonly on?: boolean
  readonly children: ChildrenFunction
}

export type ReactToggledInterface = React.ComponentClass<ReactToggledProps>

declare const Toggle: ReactToggledInterface
export default Toggle
