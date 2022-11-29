import { styled } from '@material-ui/core'
import { FC, Fragment } from 'react'
import { useWithTitle } from './useWithTitle'

const RightComponent = styled('div')({
  marginLeft: '10px'
})

export const withTitle =
  <Props extends object>(WrappedComponent: FC<Props>): FC<Props & TitledComponentProps> =>
  props => {
    const { classes, title, rightComponent } = useWithTitle(props)

    if (props.title) {
      return (
        <div className={classes.root}>
          <span className={classes.title}>
            {title}
            {props.required && ` *`}
            {rightComponent && <RightComponent>{rightComponent}</RightComponent>}
          </span>
          <WrappedComponent {...props} />
        </div>
      )
    }

    return (
      <Fragment>
        <WrappedComponent {...props} />
      </Fragment>
    )
  }

export type TitleProps = {
  text?: string
  rightComponent?: JSX.Element
}

export type TitledComponentProps = {
  title?: TitleProps | string
  required?: boolean
}
