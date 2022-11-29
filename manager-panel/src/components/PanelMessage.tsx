import { makeStyles, ThemeOptions } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      width: '100%',
      height: '100%',
      borderRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&__text': {
        display: 'grid',
        textAlign: 'center',

        span: {
          textAlign: 'center'
        },

        '&--first-span': {
          letterSpacing: '0.18px',
          fontSize: '24px',
          color: theme.panelMessage?.mainTextColor,
          marginBottom: '10px',
          fontWeight: '600'
        },
        '&--second-span': {
          fontSize: '14px',
          letterSpacing: '0.1px',
          opacity: '0.4',
          color: theme.panelMessage?.secondTextColor
        }
      }
    }
  }),
  { name: 'PanelMessage' }
)

export const PanelMessage: React.FC<panelMessageProps> = props => {
  const classes = useStyles()

  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.root}__text`}>
        <span className={`${classes.root}__text--first-span`}>{props.title}</span>
        <span className={`${classes.root}__text--second-span`}>{props.subTitle}</span>
      </div>
    </div>
  )
}

type panelMessageProps = {
  title: string
  subTitle?: string
}
