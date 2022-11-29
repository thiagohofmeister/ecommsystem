import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(
  {
    root: {
      display: 'grid',
      gridTemplateColumns: '25px auto',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      gap: '5px',
      fontSize: '14px',

      '&:not(:last-child)': {
        marginBottom: '15px'
      },

      '& span': {
        fontSize: '12px'
      },

      '&__icon': {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
      }
    }
  },
  {
    name: 'DefaultActionItem'
  }
)

export const useDefaultActionItems = () => {
  const classes = useStyles()

  return {
    classes
  }
}

interface DefaultActionItemsProps {
  iconColor: string
}
