import { createTheme } from '@material-ui/core/styles'

export default createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0
        },
        html: {
          height: '100vh',
          overflow: 'hidden'
        },
        body: {
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          overflow: 'hidden',
          minHeight: '100vh'
        },
        code: {
          fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
        },
        'textarea, input, button, select': {
          fontFamily: 'inherit',
          fontSize: 'inherit'
        },
        a: {
          textDecoration: 'none',
          color: 'inherit'
        },
        '::-webkit-scrollbar': {
          width: ' 5px'
        },
        '::-webkit-scrollbar-track': {
          background: '#e8e8e8'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#a9a9a9',
          borderRadius: '100px'
        }
      }
    }
  },
  activityIndicatorBackgroundColor: 'gray',
  table: {
    header: {
      backgroundColor: '#f2f4f3'
    },
    body: {
      column: {
        color: '#666'
      },
      row: {
        borderBottomColor: '#dfdfdf',
        hoverBackgroundColor: '#f2f4f3',
        selectedBackgroundColor: '#f2f4f3',
        disabledBackgroundColor: '#f2f4f3',
        disabledColor: '#a2a3a2'
      }
    }
  },
  list: {
    paginator: {
      breakColor: '#96a1a8',
      page: {
        backgroundColor: '#FFF',
        hover: {
          borderColor: '#f4f5f5',
          backgroundColor: '#ccc'
        },
        active: {
          borderColor: '#f4f5f5',
          backgroundColor: '#ccc'
        },
        buttonPaginate: {
          iconColor: '#ccc',
          disabled: {
            iconColor: '#c4c4c4'
          }
        }
      }
    }
  },
  button: {
    success: {
      backgroundColor: '#0CAC6E',
      color: 'white',
      hover: {
        backgroundColor: '#098757'
      },
      active: {
        backgroundColor: '#0DBD79'
      }
    },
    cancel: {
      backgroundColor: 'none',
      color: '#FF3358'
    }
  },
  inputContainer: {
    borderColor: '#dfdfdf',
    requiredColor: '#FF3358',
    labelTitle: {
      color: '#c1c1c1',
      onFocusColor: '#1C211E'
    },
    prefixAndSuffix: {
      backgroundColor: '#E4E9E7',
      color: '#1C211E'
    }
  },
  pageContainer: {
    titleColor: '#333'
  },
  sideMenu: {
    backgroundColor: '#FFF',
    menuItem: {
      backgroundColor: '#F2F4F3',
      color: '#1C211E'
    },
    menuSubItem: {
      backgroundColor: '#E4E9E7',
      color: '#1C211E'
    }
  },
  topBar: {
    backgroundColor: '#FFF',
    borderBottomColor: 'rgba(21, 34, 50, 0.08)'
  }
})

declare module '@material-ui/core/styles/createTheme' {
  // permitir configuração usando `createTheme`
  interface ThemeOptions {
    activityIndicatorBackgroundColor?: React.CSSProperties['backgroundColor']
    iconColor?: React.CSSProperties['color']
    list?: {
      paginator?: {
        breakColor?: React.CSSProperties['color']
        page?: {
          color?: React.CSSProperties['color']
          backgroundColor?: React.CSSProperties['backgroundColor']
          hover?: {
            borderColor?: React.CSSProperties['borderColor']
            backgroundColor?: React.CSSProperties['backgroundColor']
          }
          active?: {
            borderColor?: React.CSSProperties['borderColor']
            backgroundColor?: React.CSSProperties['backgroundColor']
          }
          buttonPaginate?: {
            iconColor?: React.CSSProperties['color']
            disabled?: {
              iconColor?: React.CSSProperties['color']
            }
          }
        }
      }
    }
    panel?: {
      backgroundColor?: React.CSSProperties['backgroundColor']
    }
    panelMessage?: {
      mainTextColor?: React.CSSProperties['color']
      secondTextColor?: React.CSSProperties['color']
    }
    table?: {
      header?: {
        backgroundColor?: React.CSSProperties['backgroundColor']
        column?: {
          color?: React.CSSProperties['color']
        }
      }
      body?: {
        column?: {
          color?: React.CSSProperties['color']
        }
        row?: {
          borderBottomColor?: React.CSSProperties['borderBottomColor']
          hoverBackgroundColor?: React.CSSProperties['backgroundColor']
          selectedBackgroundColor?: React.CSSProperties['backgroundColor']
          disabledBackgroundColor?: React.CSSProperties['backgroundColor']
          disabledColor?: React.CSSProperties['color']
        }
      }
    }
    button?: {
      success?: {
        backgroundColor?: React.CSSProperties['backgroundColor']
        color?: React.CSSProperties['color']
        hover?: {
          backgroundColor?: React.CSSProperties['backgroundColor']
          color?: React.CSSProperties['color']
        }
        active?: {
          backgroundColor?: React.CSSProperties['backgroundColor']
          color?: React.CSSProperties['color']
        }
      }
      cancel?: {
        backgroundColor?: React.CSSProperties['backgroundColor']
        color?: React.CSSProperties['color']
        hover?: {
          backgroundColor?: React.CSSProperties['backgroundColor']
          color?: React.CSSProperties['color']
        }
        active?: {
          backgroundColor?: React.CSSProperties['backgroundColor']
          color?: React.CSSProperties['color']
        }
      }
    }
    inputContainer?: {
      borderColor?: React.CSSProperties['borderColor']
      requiredColor?: React.CSSProperties['color']
      labelTitle?: {
        color: React.CSSProperties['color']
        onFocusColor: React.CSSProperties['color']
      }
      prefixAndSuffix?: {
        backgroundColor?: React.CSSProperties['backgroundColor']
        color?: React.CSSProperties['color']
      }
    }
    pageContainer?: {
      titleColor?: React.CSSProperties['color']
    }
    sideMenu?: {
      backgroundColor?: React.CSSProperties['backgroundColor']
      menuItem?: {
        backgroundColor?: React.CSSProperties['backgroundColor']
        color?: React.CSSProperties['color']
      }
      menuSubItem?: {
        backgroundColor?: React.CSSProperties['backgroundColor']
        color?: React.CSSProperties['color']
      }
    }
    topBar?: {
      backgroundColor?: React.CSSProperties['backgroundColor']
      borderBottomColor?: React.CSSProperties['borderBottomColor']
    }
  }
}
