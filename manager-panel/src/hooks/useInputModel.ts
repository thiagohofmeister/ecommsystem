import { DefaultInputProps } from 'components/BaseInput'
import { useMemo } from 'react'

export const useInputModel = <Value, OnChange, Props>(
  props: InputModelProps<Value, OnChange> & Props
) => {
  const value = useMemo<Value>(() => props.value || props.controller?.field.value, [props])

  const onChange = useMemo(() => props.onChange || props.controller?.field.onChange, [props])

  return {
    ...props,
    value,
    onChange
  }
}

type InputModelProps<Value, OnChange> = DefaultInputProps & {
  value?: Value
  onChange?: OnChange
}
