import { makeStyles, ThemeOptions } from '@material-ui/core'
import classNames from 'classnames'

const useStyles = makeStyles(
  (theme: ThemeOptions) => ({
    root: {
      '&--center': {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    ellipsisIndicator: {
      display: 'inline-block',
      position: 'relative',
      width: '64px',
      height: '64px',

      '& div': {
        position: 'absolute',
        top: '27px',
        width: '11px',
        height: '11px',
        borderRadius: '50%',
        background: theme.activityIndicatorBackgroundColor,
        animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',

        '&:nth-child(1)': {
          left: '6px',
          animation: '$ellipsis-indicator1 0.6s infinite'
        },

        '&:nth-child(2)': {
          left: '6px',
          animation: '$ellipsis-indicator2 0.6s infinite'
        },

        '&:nth-child(3)': {
          left: '26px',
          animation: '$ellipsis-indicator2 0.6s infinite'
        },

        '&:nth-child(4)': {
          left: '45px',
          animation: '$ellipsis-indicator3 0.6s infinite'
        }
      }
    },
    '@keyframes ellipsis-indicator1': {
      '0%': {
        transform: 'scale(0)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    '@keyframes ellipsis-indicator3': {
      '0%': {
        transform: 'scale(1)'
      },
      '100%': {
        transform: 'scale(0)'
      }
    },
    '@keyframes ellipsis-indicator2': {
      '0%': {
        transform: 'translate(0, 0)'
      },
      '100%': {
        transform: 'translate(19px, 0)'
      }
    }
  }),
  { name: 'ActivityIndicator' }
)

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = props => {
  const classes = useStyles()

  return (
    <div className={classNames(classes.root, { [`${classes.root}--center`]: props.center })}>
      {' '}
      <div className={classes.ellipsisIndicator}>
        {[1, 2, 3, 4].map(key => (
          <div key={key} />
        ))}
      </div>
    </div>
  )
}

interface ActivityIndicatorProps {
  center?: boolean
}
